import Permission from "./permission";

export interface User {
  id?: string;
  username: string;
  fullname?: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  company_id?: string;
  permissions?: Permission[];
}
