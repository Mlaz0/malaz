import { Home, Package, Settings } from "lucide-react";

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
    title: "الملف الشخصي",
    icon: Home,
    url: "/patient-dashboard",
  },
  {
    title: "المحفظة",
    icon: Settings,
    url: "wallet",
  },
  {
    title: "الإعدادات",
    icon: Settings,
    url: "settings",
  },
];

export default function UserDashboardSidebar() {
  return (
    <Sidebar className="hidden relative border-r md:block ">
      <SidebarHeader className="px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/patient-dashboard" className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Package className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">لوحة المستخدم</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2"></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end={item.url === "/patient-dashboard"}
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
