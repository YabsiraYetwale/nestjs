import { z } from "zod";

const roleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
  permissions: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one permission.",
    }),
});

export default roleSchema;
