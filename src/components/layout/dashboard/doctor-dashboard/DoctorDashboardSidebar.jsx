import {
  BookAIcon,
  BookText,
  Clock,
  DollarSign,
  Home,
  Package,
  Settings,
  User,
} from "lucide-react";

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
    url: "/doctor-dashboard",
  },

  {
    title: "المدونات",
    icon: BookText,
    url: "blogs",
  },
  {
    title: "الأوقات المتاحة",
    icon: Clock,
    url: "availability",
  },
  {
    title: "الحجوزات",
    icon: DollarSign,
    url: "bookings",
  },

  {
    title: "الملف الشخصي",
    icon: User,
    url: "profile",
  },
  {
    title: "الإعدادات",
    icon: Settings,
    url: "settings",
  },
];
export default function DoctorDashboardSidebar() {
  return (
    <Sidebar className="hidden border-r md:block ">
      <SidebarHeader className="px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/doctor-dashboard" className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Package className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">لوحة الدكتور</span>
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
                    end={item.url === "/doctor-dashboard"}
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
