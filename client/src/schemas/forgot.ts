import { z } from "zod";

const forgotSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("Invalid email"),
});

export default forgotSchema;
