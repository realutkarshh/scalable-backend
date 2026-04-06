import { Record } from "../models/record.model.js";

export const getSummary = async (user) => {
  const matchStage = {};

  // Non-admin, non-analyst users see only their data
  if (user.role !== "admin" && user.role !== "analyst") {
    matchStage.user = user._id;
  }

  // 1. Total Income & Expense
  const totals = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  totals.forEach((item) => {
    if (item._id === "income") totalIncome = item.total;
    if (item._id === "expense") totalExpense = item.total;
  });

  const netBalance = totalIncome - totalExpense;

  // 2. Category-wise totals
  const categoryData = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);

  // 3. Recent transactions
  const recentTransactions = await Record.find(matchStage)
    .sort({ date: -1 })
    .limit(5);

  return {
    totalIncome,
    totalExpense,
    netBalance,
    categoryData,
    recentTransactions,
  };
};

// Monthly trends for the past 12 months, broken down by income/expense
export const getMonthlyTrends = async (user) => {
  const matchStage = {};
  if (user.role !== "admin" && user.role !== "analyst") matchStage.user = user._id;

  // Limit to last 12 months
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);
  twelveMonthsAgo.setHours(0, 0, 0, 0);
  matchStage.date = { $gte: twelveMonthsAgo };

  const trends = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        type: "$_id.type",
        total: 1,
      },
    },
  ]);

  return trends;
};

// Weekly trends for the past 8 weeks, broken down by income/expense
export const getWeeklyTrends = async (user) => {
  const matchStage = {};
  if (user.role !== "admin" && user.role !== "analyst") matchStage.user = user._id;

  // Limit to last 8 weeks
  const eightWeeksAgo = new Date();
  eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 56);
  eightWeeksAgo.setHours(0, 0, 0, 0);
  matchStage.date = { $gte: eightWeeksAgo };

  const trends = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          year: { $isoWeekYear: "$date" },
          week: { $isoWeek: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.week": 1 } },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        week: "$_id.week",
        type: "$_id.type",
        total: 1,
      },
    },
  ]);

  return trends;
};