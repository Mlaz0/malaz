import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  Share2,
  Bookmark,
  Tag,
  ThumbsUp,
  Facebook,
  Send,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useGetBlogById } from "@/hooks/Actions/blogs/useCurdBlogs";
import RelatedArticles from "@/components/blog.components/RelatedArticles";
import ReactMarkdown from "react-markdown";

const ShareMenu = ({ article }) => {
  const [showMenu, setShowMenu] = useState(false);
  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(article.title || "مقال رائع!");
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`,
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm">
        <Share2 className="w-4 h-4" />
        مشاركة
      </button>

      {showMenu && (
        <div className="absolute top-full mt-0 right-0 z-10 bg-white border border-border rounded-lg shadow-lg px-4 py-3 flex gap-3">
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="فيسبوك"
            className="hover:text-blue-600 transition"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title="واتساب"
            className="hover:text-green-600 transition"
          >
            <Send className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const { data, isPending } = useGetBlogById(id);

  if (isPending)
    return <p className="text-center py-10">جاري تحميل المقال...</p>;

  const article = {
    title: data.title,
    content: data.content,
    author: data.author?.author_name,
    publishDate: new Date(data.createdAt),
    category: data.category?.category_name,
    image: data.post_image?.url,
    readTime: "5 دقائق",
    likes: data.likes.length,
    tags: [], // لو عندك تاجات ضيفها هنا
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-cairo text-base leading-relaxed">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <span>/</span>
            <Link to="/Blogs" className="hover:text-primary">المقالات</Link>
            <span>/</span>
            <span className="text-foreground">{article.category}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
              {article.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(article.publishDate, "dd MMMM yyyy", { locale: ar })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{article.likes} إعجاب</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-6">
            <ShareMenu article={article} />
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-6">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 md:h-64 object-cover"
              loading="lazy"
            />
          </div>
        </header>

        {/* Article Content (Markdown) */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="prose prose-sm sm:prose lg:prose-lg rtl text-right max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-base font-medium text-foreground mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              الكلمات المفتاحية
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-muted text-muted-foreground px-3 py-1 rounded-md text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="bg-secondary/10 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                {article.author}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                طبيب نفسي متخصص في الصحة النفسية والعلاج السلوكي.
              </p>
              <Link
                to="/about"
                className="text-primary text-sm flex items-center gap-1"
              >
                تعرف على المزيد
                <ArrowLeft className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <RelatedArticles
          currentCategory={article.category}
          currentId={data._id}
        />
      </article>

      {/* CTA Section */}
      <section className="bg-primary py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-semibold text-primary-foreground mb-4">
            هل تحتاج إلى مساعدة مهنية؟
          </h2>
          <p className="text-primary-foreground/90 mb-6">
            لا تتردد في طلب المساعدة. فريقنا من المتخصصين هنا لدعمك.
          </p>
          <Link
            to="/booking"
            className="bg-white text-primary px-6 py-3 rounded-lg text-sm font-medium inline-flex items-center gap-2"
          >
            احجز استشارة
            <Calendar className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
