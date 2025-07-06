export default function CategoryFilter({ categories, selected, setSelected }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">تصفح حسب الفئة</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`px-6 py-3 rounded-xl font-medium transition-colors focus-ring ${
              selected === category
                ? "bg-primary text-primary-foreground shadow-primary"
                : "bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground border border-border"
            }`}
          >
            {category === "all" ? "جميع المقالات" : category}
          </button>
        ))}
      </div>
    </section>
  );
}
