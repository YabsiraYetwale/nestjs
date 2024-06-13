import { z } from "zod";

const userSchema = z.object({
  fullname: z
    .string()
    .min(1, "Fullname is required")
    .max(50, "Fullname can't be more than 50 characters."),
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
  permissions: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one permission.",
    }),
  roles: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one role.",
  }),
});

export default userSchema;
