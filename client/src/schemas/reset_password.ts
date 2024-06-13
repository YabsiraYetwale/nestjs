import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string({ required_error: "Password is required." }).min(8, {
      message: "You're password should be at least 8 characters long.",
    }),
    confirmPassword: z
      .string({ required_error: "Password is required." })
      .min(8, {
        message: "You're password should be at least 8 characters long.",
      }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Both passwords should be the same.",
    path: ["confirmPassword"],
  });

export default resetPasswordSchema;
