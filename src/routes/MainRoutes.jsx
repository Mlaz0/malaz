import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DoctorDashboardLayout from "@/layouts/DoctorDashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout ";
import AdminDashboard from "@/pages/admin-dashboard/AdminDashboard";
import ForgotPassword from "@/pages/auth/ForgotPassword/ForgotPassword";
import LoginPage from "@/pages/auth/LoginPage/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage/RegisterPage";
import ResetPassword from "@/pages/auth/ResetPassword/ResetPassword";
import ArticleDetailPage from "@/pages/BlogsPage/ArticleDetailPage";
import BlogsPage from "@/pages/BlogsPage/BlogsPage";
import DoctorBlogsPage from "@/pages/doctor-dashboard/DoctorBlogsPage";
import DoctorCreateBlogPage from "@/pages/doctor-dashboard/DoctorCreateBlogForm";
import DoctorDashboard from "@/pages/doctor-dashboard/DoctorDashboard";
import DoctorProfile from "@/pages/doctor-dashboard/DoctorProfile";
import DoctorSetting from "@/pages/doctor-dashboard/DoctorSetting";
import HomePage from "@/pages/HomePage/HomePage";
import UserDashboard from "@/pages/user-dashboard/UserDashboard";
import UserSetting from "@/pages/user-dashboard/UserSetting";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminSetting from "../pages/admin-dashboard/AdminSetting";
import DoctorBlogs from "@/pages/doctor-dashboard/DoctorBlogs";
import DoctorsPage from "@/pages/Doctorspage";

const MainRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "blogs",
          element: <BlogsPage />,
        },
        {
          path: "/articles/:id",
          element: <ArticleDetailPage />,
        },
        {
          path: "/doctors",
          element: <DoctorsPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },

    {
      path: "/admin-dashboard",
      element: <AdminDashboardLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "settings",
          element: <AdminSetting />,
        },
      ],
    },
    {
      path: "/user-dashboard",
      element: <UserDashboardLayout />,
      children: [
        {
          index: true,
          element: <UserDashboard />,
        },
        {
          path: "settings",
          element: <UserSetting />,
        },
      ],
    },
    {
      path: "/doctor-dashboard",
      element: <DoctorDashboardLayout />,
      children: [
        {
          index: true,
          element: <DoctorDashboard />,
        },
        { path: "create-blog", element: <DoctorCreateBlogPage /> },
        { path: "blogs", element: <DoctorBlogsPage /> },
        { path: "profile", element: <DoctorProfile /> },
        {
          path: "settings",
          element: <DoctorSetting />,
        },
        {
          path: "blogs",
          element: <DoctorBlogs />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRoutes;
