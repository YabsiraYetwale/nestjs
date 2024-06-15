import Permission from "./permission";

export interface User {
  id?: string;
  username: string;
  name?: string;
  email: string;
  password: string;
  roles?: string[];
  company_id?: string;
  permissions?: Permission[];
}
