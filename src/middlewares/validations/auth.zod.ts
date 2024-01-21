import { z } from "zod";

// Define shared schemas
const uuidSchema = z.string().uuid();

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  userID: uuidSchema,
  password: z.string().min(8),
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

const verifyEmailSchema = z.object({
  token: uuidSchema,
  userID: uuidSchema,
});

const socialLinksSchema = z.object({
  websiteURL: z.string().url().optional(),
  twitterURL: z.string().url().optional(),
  facebookURL: z.string().url().optional(),
  instagramURL: z.string().url().optional(),
});

const preferencesSchema = z.object({
  theme: z.string().optional(),
  language: z.string().optional(),
  regionalSettings: z.string().optional(),
  timeZone: z.string().optional(),
});

// Register
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
});

// Login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Sign with Google
const signWithGoogleSchema = z.object({
  email: z.string().email(),
  name: z.string(),
});

const generateOTPSchema = z.object({
  email: z.string().email(),
});

const verifyTokenSchema = z.object({
  token: z.string(),
});

const verifyUserIDSchema = z.object({
  userID: uuidSchema,
});

export {
  registerSchema,
  loginSchema,
  signWithGoogleSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  generateOTPSchema,
  verifyTokenSchema,
  verifyUserIDSchema,
};
