import BlogsCard from "@/components/blog.components/BlogsGrid";
import { useGetAllBlogs } from "@/hooks/Actions/blogs/useCurdBlogs";
import { useState } from "react";
import BlogsSkeleton from "../../components/blog.components/BlogsSkeleton";
import NoResults from "../../components/blog.components/NoResults";
import HeroSectionBlogs from "@/components/blog.components/HeroSectionBlogs";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isPending, isError } = useGetAllBlogs(page, limit);

  const currentPage = data?.data?.data?.currentPage || 1;
  const totalPages = data?.data?.data?.totalPages || 1;

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-cairo">
      <HeroSectionBlogs searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isPending ? (
          <BlogsSkeleton />
        ) : !Array.isArray(data?.data?.data?.blogs) ||
          data?.data?.data?.blogs?.length === 0 ? (
          <NoResults />
        ) : (
          <>
            <BlogsCard
              blogs={data?.data?.data?.blogs}
              isPending={isPending}
              isError={isError}
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
          </>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
