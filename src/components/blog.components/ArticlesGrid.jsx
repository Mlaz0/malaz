import ArticleCard from "./ArticleCard";
import NoResults from "./NoResults";

export default function ArticlesGrid({
  articles,
  selectedCategory,
  savedArticles,
  toggleSaveArticle,
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          {selectedCategory === "all" ? "جميع المقالات" : selectedCategory}
        </h2>
        <p className="text-muted-foreground">{articles.length} مقال</p>
      </div>

      {articles.length === 0 ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              savedArticles={savedArticles}
              onToggleSave={toggleSaveArticle}
            />
          ))}
        </div>
      )}
    </section>
  );
}
