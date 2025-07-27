import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import UserDropdown from "./UserDropdown";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { token } = useAuth();

  const navItems = [
    { to: "/", label: "الرئيسية" },
    { to: "/doctors", label: "تصفح الاطباء " },
    { to: "/blogs", label: "المدونة" },
    token && { to: "/community", label: "المنتدى" },
    // { to: "/contact", label: "تواصل معنا" },
  ];

  const isActive = (to) => {
    if (to === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(to);
  };

  return (
    <header className="sticky py-3 top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-10 w-auto" />
            <span className="text-lg md:text-xl font-bold text-foreground hidden md:block">
              ملاذ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 md:flex items-center justify-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-base md:text-lg font-semibold transition-colors hover:text-primary ${
                  isActive(item.to) ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            {token ? (
              <UserDropdown />
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/auth/login">تسجيل الدخول</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/auth/register">ابدأ الآن</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-5 md:hidden">
            <UserDropdown />
          </div>
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">تبديل قائمة التنقل</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] bg-background border-border border-r"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <Link
                    to="/"
                    className="flex items-center gap-10 justify-center w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl font-bold text-foreground">
                      ملاذ
                    </span>
                  </Link>
                  <ModeToggle />
                </div>

                <nav className="flex flex-col gap-4 py-6 px-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActive(item.to)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {!token && (
                  <div className="p-2 space-y-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                        تسجيل الدخول
                      </Link>
                    </Button>
                    <Button variant="default" className="w-full" asChild>
                      <Link
                        to="/auth/register"
                        onClick={() => setIsOpen(false)}
                      >
                        ابدأ الآن
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
