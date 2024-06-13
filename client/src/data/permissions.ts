import Permission from "@/models/permission";

const permissions: Permission[] = [
  {
    action: "can_delete_user",
    type: "user",
    label: "Can Delete Users",
  },
  {
    action: "can_get_user",
    type: "user",
    label: "Can view Users",
  },
  {
    action: "can_post_user",
    type: "user",
    label: "Can add Users",
  },
  {
    action: "can_put_user",
    type: "user",
    label: "Can modify Users",
  },
];

export default permissions;
