import {
  AlertCircle,
  BriefcaseMedical,
  BugPlay,
  DollarSign,
  Home,
  Package,
  Receipt,
  Settings,
  SquareStack,
  Stethoscope,
  TimerIcon,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, NavLink } from "react-router-dom";
const navigationItems = [
  {
    title: "الرئيسية",
    icon: Home,
    url: "/admin-dashboard",
  },

  {
    title: "التخصصات",
    icon: BriefcaseMedical,
    url: "categories",
  },
  {
    title: "الأطباء",
    icon: Stethoscope,
    url: "doctors",
  },
  {
    title: "المرضى",
    icon: Users,
    url: "patients",
  },
  {
    title: "البلاغات",
    icon: AlertCircle,
    url: "reports",
  },
  // {
  //   title: "الحجوزات",
  //   icon: TimerIcon,
  //   url: "bookings",
  // },
  {
    title: "المدفوعات",
    icon: DollarSign,
    url: "payments",
  },
  {
    title: "الإعدادات",
    icon: Settings,
    url: "settings",
  },
];
export default function AdminDashboardSidebar() {
  return (
    <Sidebar className="hidden border-r md:block ">
      <SidebarHeader className="px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="admin-dashboard" className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Package className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">لوحة المدير</span>
                  <span className="text-xs text-muted-foreground">
                    الإصدار 1.0.0
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2">التنقل</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end={item.url === "/admin-dashboard"}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 w-full justify-start px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted hover:text-primary",
                      ].join(" ")
                    }
                  >
                    <item.icon className="size-4" />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 rtl:mr-2">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
