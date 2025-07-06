import { Clock, Eye, User, Bookmark, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function ArticleCard({ article, savedArticles, onToggleSave }) {
  return (
    <article className="bg-card rounded-2xl overflow-hidden shadow-lg card-modern">
      <div className="relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover lazy"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-foreground shadow-sm">
          {article.category}
        </div>
        <button
          onClick={() => onToggleSave(article.id)}
          className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-2 rounded-full shadow-sm"
        >
          <Bookmark
            className={`w-5 h-5 ${
              savedArticles.includes(article.id)
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            }`}
          />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {article.views.toLocaleString()}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground px-2 py-1 rounded-lg text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-sm">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                {article.author}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(article.publishDate, "dd MMM yyyy", { locale: ar })}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-muted-foreground hover:text-primary rounded-full hover:bg-secondary transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <Link
              to={`/articles/${article.id}`}
              className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm"
            >
              اقرأ المزيد
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
