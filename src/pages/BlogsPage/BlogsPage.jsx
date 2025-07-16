import BlogsCard from "@/components/blog.components/BlogsGrid";
import { useGetAllBlogs } from "@/hooks/Actions/blogs/useCurdBlogs";
import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
import { useMemo, useState } from "react";
import BlogsSkeleton from "../../components/blog.components/BlogsSkeleton";
import CategoryFilter from "../../components/blog.components/CategoryFilter";
import NoResults from "../../components/blog.components/NoResults";
import HeroSectionBlogs from "@/components/blog.components/HeroSectionBlogs";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data, isPending, isError } = useGetAllBlogs();
  const { data: categories = [] } =
    useGetAllCategories();

  const filteredArticles = useMemo(() => {
    const blogs = Array.isArray(data?.blogs) ? data.blogs : [];

    return blogs.filter((blog) => {
      const matchesSearch =
        blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog?.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog?.category?.category_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        blog?.category?.category_name === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);



  const handleSearch = (value) => {
    setSearchTerm(value);
  };


  return (
    <div className="min-h-screen bg-background text-foreground font-cairo">
      <HeroSectionBlogs searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter
          categories={[{ _id: "all", name: "all" }, ...categories]}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

        {isPending ? (
          <BlogsSkeleton />
        ) : !Array.isArray(filteredArticles) ||
          filteredArticles.length === 0 ? (
          <NoResults />
        ) : (
          <BlogsCard
            blogs={filteredArticles}
            selectedCategory={selectedCategory}
            isPending={isPending}
            isError={isError}
          />
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
