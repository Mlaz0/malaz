import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
