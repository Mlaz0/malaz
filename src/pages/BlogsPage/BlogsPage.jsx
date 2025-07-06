import React, { useState, useMemo } from "react";
import HeroSection from "../../components/blog.components/HeroSection";
import FeaturedArticle from "../../components/blog.components/FeaturedArticle";
import CategoryFilter from "./../../components/blog.components/CategoryFilter";
import ArticlesGrid from "../../components/blog.components/ArticlesGrid";
import { articles } from "./blogData";
import { categories } from "./blogData";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedArticles, setSavedArticles] = useState([]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredArticle = useMemo(() => {
    return [...articles].sort((a, b) => b.publishDate - a.publishDate)[0];
  }, []);

  const toggleSaveArticle = (articleId) => {
    setSavedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-cairo">
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeaturedArticle article={featuredArticle} />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <ArticlesGrid
          articles={filteredArticles}
          selectedCategory={selectedCategory}
          savedArticles={savedArticles}
          toggleSaveArticle={toggleSaveArticle}
        />
      </div>
    </div>
  );
};

export default BlogsPage;
