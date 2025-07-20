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
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const DoctorBlogsPage = () => {
  const [modelBlog, setModelBlog] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: blogs, isPending, isError } = useGetDoctorBlogs(page, limit);
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog();
  const { mutate: deleteBlog } = useDeleteBlog();
  const currentPage = blogs?.data?.data?.currentPage || 1;
  const totalPages = blogs?.data?.data?.totalPages || 1;

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

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
            setModelBlog={setModelBlog}
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

          {blogs?.data?.data?.blogs?.length === 0 && (
            <EmptyHandler handleOpenModal={handleOpenModal} />
          )}
          <BlogsCard
            blogs={blogs?.data?.data?.blogs}
            onEdit={handleEditBlog}
            onDelete={handleDeleteBlog}
          />
          <Pagination className="mt-4" disabled={isPending}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={cn(
                    "cursor-pointer bg-card shadow hover:text-white"
                  )}
                  onClick={() => handlePagination(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className={cn(
                      "cursor-pointer bg-card shadow hover:text-white",
                      currentPage === i + 1 && "bg-primary text-white"
                    )}
                    isActive={currentPage === i + 1}
                    onClick={() => handlePagination(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  className={cn(
                    "cursor-pointer bg-card shadow hover:text-white"
                  )}
                  onClick={() => handlePagination(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default DoctorBlogsPage;
