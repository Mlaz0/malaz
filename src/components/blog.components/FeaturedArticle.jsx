import { Clock, Eye, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function FeaturedArticle({ article }) {
  if (!article) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-foreground mb-8">المقال المميز</h2>
      <div className="bg-card rounded-2xl overflow-hidden shadow-primary-lg card-modern">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover lazy"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              مميز
            </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString()}
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{article.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-sm">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{article.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(article.publishDate, "dd MMMM yyyy", { locale: ar })}
                  </p>
                </div>
              </div>
              <Link to={`/articles/${article.id}`} className="btn-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 font-medium hover:gap-3 transition-all">
                اقرأ المقال
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
