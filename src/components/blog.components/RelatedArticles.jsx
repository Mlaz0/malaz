import { Link } from "react-router-dom";
import { useGetAllBlogs } from "@/hooks/Actions/blogs/useCurdBlogs";
import { Clock } from "lucide-react";
const RelatedArticles = ({ currentCategory, currentId }) => {
  const { data, isPending, isError } = useGetAllBlogs();

  if (isPending) return (
    <div className="flex justify-center py-8">
      <div className="animate-pulse flex space-x-4 rtl:space-x-reverse">
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-4">
                <div className="h-32 bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (isError) return (
    <div className="text-center py-8 text-destructive">
      حدث خطأ أثناء تحميل المقالات
    </div>
  );

  const related = data.blogs?.filter(
    (item) => 
      item.category?.category_name === currentCategory && 
      item._id !== currentId
  ).slice(0, 2);

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
            className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="relative overflow-hidden h-32">
              <img
                src={item.post_image?.url || "https://via.placeholder.com/300x200"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent"></div>
            </div>
            <div className="p-4">
              <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs mb-2 inline-block">
                {item.category?.category_name}
              </span>
              <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 ml-1" />
                <span>5 دقائق قراءة</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;