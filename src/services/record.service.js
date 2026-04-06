import { Record } from "../models/record.model.js";
import { ApiError } from "../utils/apiError.js";

export const createRecord = async (data, userId) => {
  return await Record.create({
    ...data,
    user: userId,
  });
};

export const getRecords = async (query, user) => {
  const filter = {};

  // Filter by type (income | expense)
  if (query.type) filter.type = query.type;

  // Filter by category
  if (query.category) filter.category = query.category;

  // Filter by date range: ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = new Date(query.startDate);
    if (query.endDate) {
      // Include the full end day by setting time to end of day
      const end = new Date(query.endDate);
      end.setHours(23, 59, 59, 999);
      filter.date.$lte = end;
    }
  }

  // Admins and Analysts see all records; viewers see only their own
  if (user.role !== "admin" && user.role !== "analyst") {
    filter.user = user._id;
  }

  return await Record.find(filter).sort({ date: -1 });
};

export const updateRecord = async (id, data, user) => {
  const record = await Record.findById(id);

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  // Only owner or admin can update
  if (
    user.role !== "admin" &&
    record.user.toString() !== user._id.toString()
  ) {
    throw new ApiError(403, "Not authorized");
  }

  return await Record.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRecord = async (id, user) => {
  const record = await Record.findById(id);

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  if (
    user.role !== "admin" &&
    record.user.toString() !== user._id.toString()
  ) {
    throw new ApiError(403, "Not authorized");
  }

  await record.deleteOne();

  return { message: "Record deleted" };
};