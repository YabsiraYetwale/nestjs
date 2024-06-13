import Role from "@/models/role";
import permissions from "./permissions";

const roles: Role[] = [
  {
    id: "1",
    name: "System Admin",
    value: "admin",
    permissions: [...permissions],
  },
  {
    id: "2",
    name: "Company Admin",
    value: "c_admin",
    permissions: [...permissions],
  },
  {
    id: "3",
    name: "User",
    value: "user",
    permissions: [permissions[1]],
  },
];

export default roles;
