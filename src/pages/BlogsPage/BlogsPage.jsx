import BlogsCard from "@/components/blog.components/BlogsGrid";
import { useGetAllBlogs } from "@/hooks/Actions/blogs/useCurdBlogs";
import { useState } from "react";
import BlogsSkeleton from "../../components/blog.components/BlogsSkeleton";
import NoResults from "../../components/blog.components/NoResults";
import HeroSectionBlogs from "@/components/blog.components/HeroSectionBlogs";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending, isError } = useGetAllBlogs();

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
          <BlogsCard
            blogs={data?.data?.data?.blogs}
            isPending={isPending}
            isError={isError}
          />
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
