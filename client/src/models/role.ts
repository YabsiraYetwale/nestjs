import Permission from "./permission";

interface Role {
  id: string;
  name: string;
  value: string;
  users?: []; // users id
  permissions?: Permission[];
}

export default Role;
