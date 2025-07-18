import ModeToggle from "@/components/shared/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DoctorDashboardHeader = () => {
  const { data: doctor } = useGetUserProfile();
  const { isLoggedIn, isLoading, handleLogout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    handleLogout();
  };

  useEffect(() => {
    if (!isLoading && isLoggedIn === false) {
      navigate("/auth/login");
    }
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 md:hidden" />
        <Separator orientation="vertical" className="h-4" />

        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink disabled>لوحة الدكتور</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Link to="/doctor-dashboard" className="text-primary">
                  الرئيسية
                </Link>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-12 w-12 shrink-0 rounded-full"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={doctor?.data?.data?.userImg?.url} />
                <AvatarFallback>
                  {doctor?.data?.data?.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            style={{ direction: "rtl" }}
            className="w-56"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {doctor?.data?.data?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {doctor?.data?.data?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/" className="hover:text-primary">
                الرئيسية
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive  focus:text-destructive flex items-center justify-center gap-2">
              <button
                onClick={handleLogOut}
                type="submit"
                className="cursor-pointer "
              >
                <span>تسجيل الخروج</span>
              </button>
              <LogOut className="mr-2 h-4 w-4" />
            </DropdownMenuItem>{" "}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DoctorDashboardHeader;
