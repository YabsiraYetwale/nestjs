import { z } from "zod";

const customerSchema = z.object({
  name: z.string().min(1, "name is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  billing_address: z.string().min(1, "billing_address is required"),
  contact_person: z.string().min(1, "contact_person is required").max(100),
  phone: z.string().min(1, "phone number is required").max(100),

  shipping_address: z.string().min(1, "shipping_address is required").max(20),
  shipping_city: z.string().min(1, "shipping_city is required").max(20),
  shipping_state: z.string().min(1, "shipping_state is required").max(20),
  shipping_zip: z.string().min(1, "shipping_zipcode is required").max(20),
  shipping_country: z.string().min(1, "shipping_country is required").max(20),
});

export default customerSchema;
