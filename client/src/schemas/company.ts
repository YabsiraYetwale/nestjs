import { z } from "zod";

const companySchema = z.object({
  name: z
    .string()
    .min(2, "Company Name should at least 2 characters long.")
    .max(50, "Company Name must not be more than 50 characters long."),
  description: z
    .string()
    .min(2, "Your company description should be at least 2 characters long."),
  logo: (typeof window === "undefined"
    ? z.any()
    : z.instanceof(FileList)
  ).refine(
    (file) => file?.length !== 0,
    "A Logo image for your company is required."
  ),
  docs: (typeof window === "undefined"
    ? z.any()
    : z.instanceof(FileList)
  ).refine(
    (files) => files?.length !== 0,
    "A Document for your company is required."
  ),
  generalManager: z
    .string()
    .min(2, "Company Manager name should at least 2 characters long.")
    .max(50, "Company Manager name must not be more than 50 characters long."),
  companyNumber: z
    .string()
    .min(1, "Company Number is required.")
    .max(50, "Company Number can't be more than 50 chatacters."),
  tinNumber: z
    .string()
    .min(1, "TIN Number is required.")
    .max(50, "TIN Number can't be more than 50 chatacters."),
  houseNumber: z
    .string()
    .min(1, "House Number is required.")
    .max(50, "House Number  can't be more than 50 chatacters."),
  poBox: z
    .string()
    .min(1, "P.O. Box Number is required.")
    .max(50, "P.O. Box Number can't be more than 50 chatacters."),
  fax: z
    .string()
    .min(1, "Fax is required.")
    .max(50, "Fax can't be more than 50 chatacters."),
  email: z.string().min(1, "Email is required.").email("Enter a valid email."),
  tel1: z.string().min(1, "Phone number is required."),
  tel2: z.string().optional(),
  country: z.string({
    required_error: "Please select a country.",
  }),
  region: z.string({
    required_error: "Please select a region.",
  }),
  city: z.string({
    required_error: "Please select a city.",
  }),
  subcity: z.string({
    required_error: "Please select a subcity.",
  }),
  woreda: z.string({
    required_error: "Woreda is required.",
  }),
  kebele: z.string({
    required_error: "Woreda is required.",
  }),
});

export default companySchema;
