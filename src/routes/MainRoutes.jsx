import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DoctorDashboardLayout from "@/layouts/DoctorDashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout ";
import AdminCategories from "@/pages/admin-dashboard/AdminCategories";
import AdminDashboard from "@/pages/admin-dashboard/AdminDashboard";
import AdminDoctorDetails from "@/pages/admin-dashboard/AdminDoctors";
import DoctorApprovalsTab from "@/pages/admin-dashboard/doctor-tabs/DoctorApprovalTab";
import DoctorDetailsTab from "@/pages/admin-dashboard/doctor-tabs/DoctorDetailsTab";
import DoctorSuspendedTab from "@/pages/admin-dashboard/doctor-tabs/DoctorSuspendedTab";
import ForgotPassword from "@/pages/auth/ForgotPassword/ForgotPassword";
import LoginPage from "@/pages/auth/LoginPage/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage/RegisterPage";
import ResetPassword from "@/pages/auth/ResetPassword/ResetPassword";
import ProtectedAuth from "@/protected/ProtectedAuth";
import BlogDetailPage from "@/pages/BlogsPage/BlogDetailPage";
import BlogsPage from "@/pages/BlogsPage/BlogsPage";
import Community from "@/pages/Community/Community";
import DoctorBlogsPage from "@/pages/doctor-dashboard/DoctorBlogsPage";
import DoctorCreateBlogPage from "@/pages/doctor-dashboard/DoctorCreateBlogForm";
import DoctorDashboard from "@/pages/doctor-dashboard/DoctorDashboard";
import DoctorProfile from "@/pages/doctor-dashboard/DoctorProfile";
import DoctorSetting from "@/pages/doctor-dashboard/DoctorSetting";
import DoctorDetails from "@/pages/DoctorPage/DoctorDetails";
import DoctorsPage from "@/pages/DoctorPage/Doctorspage";
import HomePage from "@/pages/HomePage/HomePage";
import UserSettings from "@/pages/user-dashboard/UserSettings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminSetting from "../pages/admin-dashboard/AdminSetting";
import AdminPatients from "@/pages/admin-dashboard/AdminPatients";
import PatientDetails from "@/pages/admin-dashboard/patient-tabs/PatientDetails";
import PatientPosts from "@/pages/admin-dashboard/patient-tabs/PatientPosts";
import UserProfile from "@/pages/user-dashboard/UserProfile";
import UserWalletPage from "@/pages/user-dashboard/UserWalletPage";
import { PaymentSuccess } from "@/pages/user-dashboard/PaymentSuccess";
import AvalibilityPage from "@/pages/doctor-dashboard/AvalibilityPage/AvalibilityPage";
import Dashboard from "@/pages/doctor-dashboard/DoctorAssessment";
import DoctorTimeSlots from "@/pages/DoctorPage/DoctorTimeSlots";
import BookingUserPage from "@/pages/user-dashboard/BookingUserPage";
import AdminBookings from "@/pages/admin-dashboard/AdminBookings";
import AdminPayments from "@/pages/admin-dashboard/AdminPayments";
import DoctorBookings from "@/pages/doctor-dashboard/DoctorBookings";
import AdminReports from "@/pages/admin-dashboard/AdminReports";
import Reviews from "@/pages/doctor-dashboard/Reviews";

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
          path: "blogs/:id",
          element: <BlogDetailPage />,
        },
        {
          path: "/doctors",
          element: <DoctorsPage />,
        },
        {
          path: "/doctors/details/:id",
          element: <DoctorDetails />,
        },
        {
          path: "/doctors/slots/:id",
          element: <DoctorTimeSlots />,
        },

        {
          path: "/community",
          element: <Community />,
        },

        {
          path: "/patient-dashboard",
          element: <UserDashboardLayout />,
          children: [
            {
              index: true,
              element: <UserProfile />,
            },
            {
              path: "wallet",
              element: <UserWalletPage />,
            },
            {
              path: "settings",
              element: <UserSettings />,
            },
            {
              path: "booking",
              element: <BookingUserPage />,
            },
            {
              path: "success",
              element: <PaymentSuccess />,
            },
          ],
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
        {
          path: "categories",
          element: <AdminCategories />,
        },
        {
          path: "bookings",
          element: <AdminBookings />,
        },
        {
          path: "payments",
          element: <AdminPayments />,
        },
        {
          path: "reports",
          element: <AdminReports />,
        },
        {
          path: "patients",
          element: <AdminPatients />,
          children: [
            {
              index: true,
              element: <PatientDetails />,
            },
            {
              path: "posts",
              element: <PatientPosts />,
            },
          ],
        },
        {
          path: "doctors",
          element: <AdminDoctorDetails />,
          children: [
            {
              index: true,
              element: <DoctorDetailsTab />,
            },

            {
              path: "approvals",
              element: <DoctorApprovalsTab />,
            },
            {
              path: "suspended",
              element: <DoctorSuspendedTab />,
            },
          ],
        },
      ],
    },

    {
      path: "/doctor-dashboard",
      element: <DoctorDashboardLayout />,
      children: [
        {
          path: "main",
          element: <DoctorDashboard />,
        },
        { path: "create-blog", element: <DoctorCreateBlogPage /> },
        { path: "blogs", element: <DoctorBlogsPage /> },
        {
          index: true,

          element: <DoctorProfile />,
        },
        { path: "availability", element: <AvalibilityPage /> },

        { path: "Analysis", element: <Dashboard /> },

        { path: "bookings", element: <DoctorBookings /> },
        {
          path: "reviews",
          element: <Reviews />,
        },
        {
          path: "settings",
          element: <DoctorSetting />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRoutes;
