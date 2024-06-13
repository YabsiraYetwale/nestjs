import { z } from "zod";

const verificationSchema = z.object({
  code: z.string({ required_error: "Verification code is empty." }),
});

export default verificationSchema;
