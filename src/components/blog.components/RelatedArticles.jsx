import { Link } from "react-router-dom";
import { useGetAllBlogs } from "@/hooks/Actions/blogs/useCurdBlogs";
const RelatedArticles = ({ currentCategory, currentId }) => {
  const { data, isPending, isError } = useGetAllBlogs();
console.log(data);

  if (isPending) return <p>جاري التحميل...</p>;
  if (isError) return <p>حدث خطأ أثناء تحميل المقالات</p>;

  const related = data.blogs?.filter(
    (item) => item.category === currentCategory && item._id !== currentId
  ).slice(0, 4); // عرض 4 مقالات فقط

  if (!related?.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        مقالات ذات صلة
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {related.map((item) => (
          <Link
            key={item._id}
            to={`/blogs/${item._id}`}
            className="bg-card rounded-xl overflow-hidden border border-border"
          >
            <img
              src={item.image || "https://via.placeholder.com/300x200"}
              alt={item.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs mb-2 inline-block">
                {item.category}
              </span>
              <h3 className="text-sm font-medium text-foreground line-clamp-2">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
