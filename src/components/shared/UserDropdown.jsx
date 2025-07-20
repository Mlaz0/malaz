import { useAuth } from "@/context/AuthContext";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserDropdown = () => {
  const { handleLogout, isLoggedIn } = useAuth();
  const { data } = useGetUserProfile();
  const navigate = useNavigate();
  const handleLogOut = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative cursor-pointer h-12 w-12 rounded-full"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={data?.data?.data?.userImg?.url}
                alt={data?.data?.data?.name}
              />
              <AvatarFallback>
                {data?.data?.data?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{ direction: "rtl" }}
          className="w-56 bg-card"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {data?.data?.data?.name}
              </p>
              <p className="text-xs leading-none ">{data?.data?.data?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              to={
                data?.data?.data?.role === "admin"
                  ? "/admin-dashboard"
                  : data?.data?.data?.role === "doctor"
                  ? "/doctor-dashboard"
                  : "/patient-dashboard"
              }
              className="w-full cursor-pointer hover:text-white flex items-center"
            >
              <User className="mr-2 h-4 w-4 text-primary" />
              الملف الشخصي
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild> </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive  focus:text-destructive flex items-center justify-center gap-2">
            <button onClick={handleLogOut} type="submit" className=" ">
              <span>تسجيل الخروج</span>
            </button>
            <LogOut className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropdown;
