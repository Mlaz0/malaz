import { Search } from "lucide-react";

export default function HeroSection({ searchTerm, setSearchTerm }) {
  return (
    <section className="bg-primary from-primary to-accent py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
          مقالات الصحة النفسية
        </h1>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-100">
          اكتشف مجموعة شاملة من المقالات المتخصصة في الصحة النفسية والعلاج
          النفسي
        </p>
        <div className="max-w-2xl mx-auto relative animate-fade-in-up delay-200">
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="ابحث في المقالات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:ring-2 focus:ring-white focus:outline-none text-lg text-primary-foreground placeholder:text-primary-foreground/70"
          />
        </div>
      </div>
    </section>
  );
}
