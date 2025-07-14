import BlogCard from "./BlogCard";

export default function BlogsCard({
  blogs,
  selectedCategory,
  onEdit,
  onDelete,
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          {selectedCategory === "all" ? "جميع المقالات" : selectedCategory}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
