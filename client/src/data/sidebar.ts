import {
  Activity,
  Building2,
  LayoutDashboard,
  Lock,
  LucideAccessibility,
  LucideIcon,
  Settings,
  Users,
  UsersRound,
} from "lucide-react";

interface Link {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
}

export const regularLinks: Link[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    variant: "default",
  },
  {
    title: "Invoices",
    href: "/dashboard/invoices",
    icon: Activity,
    variant: "ghost",
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: UsersRound,
    variant: "ghost",
  },

  {
    title: "Companies",
    href: "/dashboard/companies",
    icon: Building2,
    variant: "ghost",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    variant: "ghost",
  },
];

export const adminLinks: Link[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    variant: "default",
  },
  {
    title: "Invoices",
    href: "/admin/invoices",
    icon: Activity,
    variant: "ghost",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    variant: "ghost",
  },
  {
    title: "Roles",
    href: "/admin/roles",
    icon: Lock,
    variant: "ghost",
  },
  {
    title: "Companies",
    href: "/admin/companies",
    icon: Building2,
    variant: "ghost",
  },
];
