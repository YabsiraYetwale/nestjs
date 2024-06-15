import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Fullname is required").max(100),
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    retypePassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
  })
  .refine((schema) => schema.password === schema.retypePassword, {
    message: "Both passwords should be the same.",
    path: ["password"],
  });

export default signUpSchema;
