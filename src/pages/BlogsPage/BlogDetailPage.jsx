import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  ThumbsUp,
  Facebook,
  Send,
  Quote,
  Code,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { useGetBlogById } from "@/hooks/Actions/blogs/useCurdBlogs";
import RelatedArticles from "@/components/blog.components/RelatedArticles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
        <Share2 className="w-4 h-4" />
        مشاركة
      </button>

      {showMenu && (
        <div className="absolute top-full mt-0 right-0 z-10 bg-white border border-border rounded-lg shadow-lg px-4 py-3 flex gap-3 animate-in fade-in-0 zoom-in-95">
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="فيسبوك"
            className="hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title="واتساب"
            className="hover:text-green-600 transition-colors p-1 rounded hover:bg-green-50"
          >
            <Send className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
};

const CodeBlock = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "text";

  const copyCode = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-slate-800 text-slate-300 px-4 py-2 rounded-t-lg text-sm">
        <span className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          {language}
        </span>
        <button
          onClick={copyCode}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? "تم النسخ" : "نسخ"}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-b-lg overflow-x-auto">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const { data, isPending } = useGetBlogById(id);

  if (isPending)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل المقال...</p>
        </div>
      </div>
    );

  const article = {
    title: data?.data?.data?.title,
    content: data?.data?.data?.content,
    author: data?.data?.data?.author?.name,
    autherImg: data?.data?.data?.author?.userImg?.url,
    publishDate: new Date(data?.data?.data?.createdAt),
    category: data?.data?.data?.category?.category_name,
    image: data?.data?.data?.post_image?.url,
    readTime: "5 دقائق",
    likes: data?.data?.data?.likes?.length || 0,
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-cairo text-base leading-relaxed">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link to="/Blogs" className="hover:text-primary transition-colors">
              المقالات
            </Link>
            <span>/</span>
            <span className="text-foreground">{article.category}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {article.publishDate && !isNaN(article.publishDate)
                  ? format(article.publishDate, "dd MMMM yyyy")
                  : ""}
              </span>
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
          <div className="rounded-xl overflow-hidden mb-8 shadow-lg">
            <img
              src={article?.image}
              alt={article.title}
              className="w-full h-48 md:h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </header>

        {/* Article Content (Modern Markdown) */}
        <div className="bg-card rounded-xl p-6 md:p-8 mb-8 shadow-sm border border-border/50">
          <div className="prose prose-slate max-w-none rtl prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-em:text-foreground prose-li:text-foreground prose-blockquote:text-foreground">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                h1: ({ ...props }) => (
                  <h1
                    className="text-3xl md:text-4xl font-bold mb-6 mt-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight"
                    {...props}
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-foreground border-r-4 border-primary pr-4"
                    {...props}
                  />
                ),
                h3: ({ ...props }) => (
                  <h3
                    className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-foreground"
                    {...props}
                  />
                ),
                h4: ({ ...props }) => (
                  <h4
                    className="text-lg md:text-xl font-medium mb-2 mt-4 text-foreground"
                    {...props}
                  />
                ),
                p: ({ ...props }) => (
                  <p
                    className="mb-4 text-foreground leading-relaxed text-base md:text-lg"
                    {...props}
                  />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-r-4 border-primary/30 bg-primary/5 p-4 md:p-6 rounded-l-lg my-6 relative"
                    {...props}
                  >
                    <Quote className="absolute top-2 left-2 w-6 h-6 text-primary/40" />
                    <div className="pr-8" />
                  </blockquote>
                ),
                img: ({ ...props }) => (
                  <figure className="my-6 md:my-8">
                    <img
                      className="rounded-lg shadow-lg w-full hover:shadow-xl transition-shadow duration-300 cursor-zoom-in"
                      {...props}
                    />
                    {props.alt && (
                      <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                        {props.alt}
                      </figcaption>
                    )}
                  </figure>
                ),
                table: ({ ...props }) => (
                  <div className="overflow-x-auto my-6 rounded-lg border border-border shadow-sm">
                    <table className="w-full" {...props} />
                  </div>
                ),
                thead: ({ ...props }) => (
                  <thead className="bg-muted/50" {...props} />
                ),
                th: ({ ...props }) => (
                  <th
                    className="p-3 md:p-4 text-right font-semibold text-foreground border-b border-border"
                    {...props}
                  />
                ),
                td: ({ ...props }) => (
                  <td
                    className="p-3 md:p-4 text-right border-b border-border/50 hover:bg-muted/20 transition-colors"
                    {...props}
                  />
                ),
                a: ({ href, ...props }) => (
                  <a
                    href={href}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors"
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href?.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    {...props}
                  >
                    {props.children}
                    {href?.startsWith("http") && (
                      <ExternalLink className="w-3 h-3" />
                    )}
                  </a>
                ),
                code: ({ inline, className, children, ...props }) => {
                  if (inline) {
                    return (
                      <code
                        className="bg-muted/60 text-primary px-2 py-1 rounded text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <CodeBlock className={className}>{children}</CodeBlock>
                  );
                },
                ul: ({ ...props }) => (
                  <ul className="space-y-2 mb-4 mr-6" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="space-y-2 mb-4 mr-6" {...props} />
                ),
                li: ({ ...props }) => (
                  <li
                    className="text-foreground leading-relaxed relative"
                    {...props}
                  />
                ),
                hr: ({ ...props }) => (
                  <hr
                    className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
                    {...props}
                  />
                ),
                strong: ({ ...props }) => (
                  <strong
                    className="font-semibold text-foreground"
                    {...props}
                  />
                ),
                em: ({ ...props }) => (
                  <em className="italic text-foreground" {...props} />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Enhanced Author Bio */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-8 border border-primary/20">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 group-hover:scale-110 transition-transform duration-300">
              <AvatarImage
                src={article?.autherImg || "/placeholder.svg"}
                alt={article?.author}
                className="group-hover:brightness-110 transition-all"
              />
              <AvatarFallback>
                {article?.author
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {article?.author}
              </h3>
              <p className="text-muted-foreground mb-3 leading-relaxed">
                طبيب نفسي متخصص في الصحة النفسية والعلاج السلوكي مع خبرة تزيد عن
                10 سنوات في المجال.
              </p>
              <Link
                to="/about"
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 transition-colors"
              >
                تعرف على المزيد
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <RelatedArticles
          currentCategory={article.category}
          currentId={data?.data?.data?._id}
        />
      </article>

      {/* Enhanced CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            هل تحتاج إلى مساعدة مهنية؟
          </h2>
          <p className="text-primary-foreground/90 mb-8 text-lg max-w-2xl mx-auto">
            لا تتردد في طلب المساعدة. فريقنا من المتخصصين هنا لدعمك في رحلتك نحو
            الصحة النفسية.
          </p>
          <Link
            to="/booking"
            className="bg-white text-primary px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-lg"
          >
            احجز استشارة
            <Calendar className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
