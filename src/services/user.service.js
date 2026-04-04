import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";


export const createUser = async (data) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // Create user
  const user = await User.create(data);

  return user;
};

export const getUsers = async () => {
  // Password is already excluded due to select: false
  return await User.find();
};

export const updateUserStatus = async (userId, isActive) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isActive },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};