import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import ForgotPassword from "@/pages/auth/ForgotPassword/ForgotPassword";
import LoginPage from "@/pages/auth/LoginPage/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage/RegisterPage";
import ResetPassword from "@/pages/auth/ResetPassword/ResetPassword";
import BlogsPage from "@/pages/BlogsPage/BlogsPage";
import HomePage from "@/pages/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  ]);

  return <RouterProvider router={router} />;
};

export default MainRoutes;
