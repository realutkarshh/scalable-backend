import { Record } from "../models/record.model.js";

export const getSummary = async (user) => {
  const matchStage = {};

  // Non-admin users see only their data
  if (user.role !== "admin") {
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
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    totalIncome,
    totalExpense,
    netBalance,
    categoryData,
    recentTransactions,
  };
};