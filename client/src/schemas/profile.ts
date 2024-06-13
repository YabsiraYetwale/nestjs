import { z } from "zod";
export const profileSchema = z
  .object({
    fullname: z
      .string()
      .min(1, "Fullname is required.")
      .max(50, "Fullname can't be more than 50 characters."),
    username: z.string().min(1, "Username is required.").max(100),
    picture: z
      .custom<FileList>()
      .transform((file) => file.length > 0 && file.item(0))
      .refine((file) => !file || (!!file && file.size <= 2 * 1024 * 1024), {
        message: "The profile picture must be a maximum of 2MB.",
      })
      .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
        message: "Only images are allowed to be sent.",
      }),
    email: z.string().min(1, "Email is required.").email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must have than 8 characters")
      .optional()
      .or(z.literal("")),
    new_password: z
      .string()
      .min(8, "Password must have than 8 characters")
      .optional()
      .or(z.literal("")),
    confirm_new_password: z
      .string()
      .min(8, {
        message: "You're password should be at least 8 characters long.",
      })
      .optional()
      .or(z.literal("")),
  })
  .refine((schema) => schema.new_password === schema.confirm_new_password, {
    message: "Both passwords should be the same.",
    path: ["new_password"],
  });

export const passRequiredProfileSchema = z
  .object({
    fullname: z
      .string()
      .min(1, "Fullname is required")
      .max(50, "Fullname can't be more than 50 characters."),
    username: z.string().min(1, "Username is required").max(100),
    picture: z
      .custom<FileList>()
      .transform((file) => file.length > 0 && file.item(0))
      .refine((file) => !file || (!!file && file.size <= 2 * 1024 * 1024), {
        message: "The profile picture must be a maximum of 2MB.",
      })
      .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
        message: "Only images are allowed to be sent.",
      }),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, "Password must have than 8 characters"),
    new_password: z
      .string({ required_error: "Password is required." })
      .min(8, "Password must have than 8 characters"),
    confirm_new_password: z
      .string({ required_error: "Password is required." })
      .min(8, {
        message: "You're password should be at least 8 characters long.",
      }),
  })
  .refine((schema) => schema.new_password === schema.confirm_new_password, {
    message: "Both passwords should be the same.",
    path: ["new_password"],
  });
