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
    href: "/en/dashboard/invoices",
    icon: Activity,
    variant: "ghost",
  },
  {
    title: "Customers",
    href: "/en/dashboard/customers",
    icon: UsersRound,
    variant: "ghost",
  },

  {
    title: "Companies",
    href: "/en/dashboard/companies",
    icon: Building2,
    variant: "ghost",
  },
  {
    title: "Settings",
    href: "/en/dashboard/settings",
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
    href: "/en/admin/invoices",
    icon: Activity,
    variant: "ghost",
  },
  {
    title: "Users",
    href: "/en/admin/users",
    icon: Users,
    variant: "ghost",
  },
  {
    title: "Roles",
    href: "/en/admin/roles",
    icon: Lock,
    variant: "ghost",
  },
  {
    title: "Companies",
    href: "/en/admin/companies",
    icon: Building2,
    variant: "ghost",
  },
];
