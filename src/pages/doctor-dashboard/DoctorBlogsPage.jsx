"use client";

import BlogsCard from "@/components/blog.components/BlogsGrid";
import EmptyHandler from "@/components/layout/dashboard/doctor-dashboard/EmptyHandler";
import { Button } from "@/components/ui/button";
import {
  useDeleteBlog,
  useGetDoctorBlogs,
  useUpdateBlog,
} from "@/hooks/Actions/blogs/useCurdBlogs";
import { Plus } from "lucide-react";
import { useState } from "react";
import BlogsSkeleton from "../../components/blog.components/BlogsSkeleton";
import ErrorHandler from "../../components/layout/dashboard/doctor-dashboard/ErrorHandler";
import DoctorCreateBlogPage from "./DoctorCreateBlogForm";

const DoctorBlogsPage = () => {
  const [modelBlog, setModelBlog] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const { data: blogs, isPending, isError } = useGetDoctorBlogs();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog();
  const { mutate: deleteBlog } = useDeleteBlog();

  if (isPending) {
    return <BlogsSkeleton />;
  }
  function handleOpenModal() {
    setModelBlog(!modelBlog);
  }

  const handleEditBlog = (blog) => {
    setEditBlog(blog);
    setModelBlog(true);
  };

  const handleUpdateBlog = (values, { resetForm }) => {
    try {
      // expects values._id or values.id
      updateBlog(
        { data: values, id: `${editBlog._id}` },
        {
          onSuccess: () => {
            resetForm && resetForm();
            setModelBlog(false);
            setEditBlog(null);
          },
        }
      );
    } catch (error) {
      console.error("Error Updating Blog:", error);
    }
  };
  const handleDeleteBlog = (blogId) => {
    deleteBlog({ id: blogId });
  };

  return (
    <>
      <div className="min-h-screen relative">
        {modelBlog && (
          <DoctorCreateBlogPage
            handleOpenModal={handleOpenModal}
            editBlog={editBlog}
            onUpdateBlog={handleUpdateBlog}
            isUpdating={isUpdating}
          />
        )}
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary">مقالاتي</h1>
            <Button
              onClick={handleOpenModal}
              className="bg-primary hover:bg-primary/90 cursor-pointer"
            >
              مقال جديد
              <Plus className="w-4 h-4 mr-2" />
            </Button>
          </div>

          {isError && <ErrorHandler />}

          {blogs?.blogs?.length === 0 && (
            <EmptyHandler handleOpenModal={handleOpenModal} />
          )}
          <BlogsCard
            blogs={blogs?.blogs}
            onEdit={handleEditBlog}
            onDelete={handleDeleteBlog}
          />
        </div>
      </div>
    </>
  );
};

export default DoctorBlogsPage;
