import MainLayout from "@/layouts/MainLayout";
import BlogsPage from "@/pages/BlogsPage/BlogsPage";
import HomePage from "@/pages/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const MainRoutes = () => {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/blogs",
          element: <BlogsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default MainRoutes;
