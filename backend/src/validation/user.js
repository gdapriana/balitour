import { z } from "zod";

class UserValidation {
  static CREATE = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
    name: z.string().min(3),
    role: z.string().min(1),
  })
  static REGISTER = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
    name: z.string().min(3),
  });
  static LOGIN = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
  });
  static UPDATE = z.object({
    name: z.string().min(3).optional(),
    password : z.string().min(3).optional(),
    email: z.string().email().or(z.null()).optional(),
    profilePicture: z.string().url().or(z.null()).optional(),
    phoneNumber: z.string().or(z.null()).optional(),
    gender: z.string().or(z.null()).optional(),
  })
  static GETS = z.object({
    count: z.number().min(1).optional(),
    username: z.string().optional(),
    name: z.string().optional(),
  })
}

export default UserValidation;
