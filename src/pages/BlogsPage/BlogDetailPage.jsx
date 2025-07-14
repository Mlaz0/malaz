import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, Clock, Eye, ArrowLeft, Share2, Bookmark, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { useGetBlogById } from '@/hooks/Actions/blogs/useCurdBlogs'

const BlogDetailPage = () => {
  const { id } = useParams()

  const { data } = useGetBlogById(id)
  console.log(data);

  // Mock article data
  const article = {
    id: parseInt(id || '1'),
    title: 'كيفية التعامل مع القلق في الحياة اليومية',
    content: `
      <p class="mb-4">القلق جزء طبيعي من الحياة، لكن عندما يصبح مفرطاً قد يؤثر على جودة حياتنا بشكل كبير. في هذا المقال، سنتعرف على استراتيجيات فعالة للتعامل مع القلق وإدارته بطريقة صحية.</p>

      <h2 class="text-xl font-semibold mt-8 mb-4">ما هو القلق؟</h2>
      <p class="mb-4">القلق هو استجابة طبيعية للتوتر والضغوط. إنه شعور بالخوف أو القلق حول ما قد يحدث في المستقبل.</p>

      <h2 class="text-xl font-semibold mt-8 mb-4">أعراض القلق الشائعة</h2>
      <ul class="list-disc pr-4 mb-4">
        <li class="mb-2">الشعور بالتوتر أو القلق</li>
        <li class="mb-2">زيادة معدل ضربات القلب</li>
        <li class="mb-2">التنفس السريع</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">استراتيجيات للتعامل مع القلق</h2>
      
      <h3 class="text-lg font-medium mt-6 mb-3">1. تقنيات التنفس العميق</h3>
      <p class="mb-4">التنفس العميق هو أحد أبسط وأكثر الطرق فعالية لتهدئة القلق.</p>
    `,
    author: 'د. سارة أحمد',
    publishDate: new Date('2024-01-15'),
    category: 'القلق والتوتر',
    image: 'https://images.pexels.com/photos/7176305/pexels-photo-7176305.jpeg',
    readTime: '5 دقائق',
    views: 1250,
    tags: ['القلق', 'الصحة النفسية', 'العلاج']
  }

  // Mock related articles
  const relatedArticles = [
    {
      id: 2,
      title: 'فهم الاكتئاب: الأعراض والعلاج',
      image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg',
      category: 'الاكتئاب'
    },
    {
      id: 4,
      title: 'تقنيات الاسترخاء والتأمل للصحة النفسية',
      image: 'https://images.pexels.com/photos/7176305/pexels-photo-7176305.jpeg',
      category: 'تقنيات العلاج'
    }
  ]

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
              <span>{format(article.publishDate, 'dd MMMM yyyy', { locale: ar })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{article.views.toLocaleString()} مشاهدة</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-6">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm">
              <Share2 className="w-4 h-4" />
              مشاركة
            </button>
            <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg text-sm">
              <Bookmark className="w-4 h-4" />
              حفظ
            </button>
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

        {/* Article Content */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Tags */}
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

        {/* Author Bio */}
        <div className="bg-secondary/10 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">{article.author}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                طبيبة نفسية متخصصة في علاج اضطرابات القلق والاكتئاب.
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
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">مقالات ذات صلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                to={`/articles/${relatedArticle.id}`}
                className="bg-card rounded-xl overflow-hidden border border-border"
              >
                <img
                  src={relatedArticle.image}
                  alt={relatedArticle.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs mb-2 inline-block">
                    {relatedArticle.category}
                  </span>
                  <h3 className="text-sm font-medium text-foreground line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
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
  )
}

export default BlogDetailPage