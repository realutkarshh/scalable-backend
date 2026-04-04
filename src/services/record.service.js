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

  // Optional filters
  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  // Example: only admin sees all, others see their own
  if (user.role !== "admin") {
    filter.user = user._id;
  }

  return await Record.find(filter).sort({ createdAt: -1 });
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