export interface Permission {
  id?: string;
  action: string;
  label: string;
  type?: "user" | "invoice" | "company" | "receipt";
}

export default Permission;
