import jwt, { SignOptions } from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import config from '../config';
import type { RegisterInput, LoginInput } from '../validators/auth.validator';

export interface AuthTokens {
  token: string;
  expiresIn: string;
}

export const generateToken = (userId: string): AuthTokens => {
  const expiresIn = '7d';

  const token = jwt.sign(
    { id: userId },
    config.jwt.secret,
    { expiresIn }
  );

  return {
    token,
    expiresIn
  };
};

export const register = async (input: RegisterInput['body']) => {
  const { username, email, password } = input;

  // Check if user exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error('Email already registered');
    }
    throw new Error('Username already taken');
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password
  });

  // Generate token
  const { token } = generateToken(user._id.toString());

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    token
  };
};

export const login = async (input: LoginInput['body']) => {
  const { email, password } = input;

  // Find user with password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const { token } = generateToken(user._id.toString());

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    },
    token
  };
};

export const getProfile = async (userId: string) => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const updateProfile = async (userId: string, input: { username?: string; avatar?: string }) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (input.username) {
    const existingUser = await User.findOne({
      username: input.username,
      _id: { $ne: userId }
    });

    if (existingUser) {
      throw new Error('Username already taken');
    }

    user.username = input.username;
  }

  if (input.avatar !== undefined) {
    user.avatar = input.avatar;
  }

  await user.save();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    role: user.role
  };
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  // Check current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new Error('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  return { message: 'Password changed successfully' };
};
