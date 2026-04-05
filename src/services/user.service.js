import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import bcrypt from "bcryptjs";


export const createUser = async (data) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

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

export const updateUserRole = async (userId, role) => {
  const allowedRoles = ["admin", "analyst", "viewer"];

  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, `Invalid role. Must be one of: ${allowedRoles.join(", ")}`);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};