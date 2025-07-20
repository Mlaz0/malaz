import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function HeroSectionBlogs({ searchTerm, handleSearch }) {
  return (
    <section className={`bg-card/80 backdrop-blur-sm border-b py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold  mb-6 animate-fade-in-up">
          مقالات الصحة النفسية
        </h1>
        <p className="text-xl  mb-8 max-w-3xl mx-auto animate-fade-in-up delay-100">
          اكتشف مجموعة شاملة من المقالات المتخصصة في الصحة النفسية والعلاج
          النفسي
        </p>
        {/* Search Bar */}
        {/* <div className="max-w-2xl mx-auto relative animate-fade-in-up delay-200">
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>

          <Input
            placeholder="ابحث في المقالات..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pr-10 focus-ring w-full rounded-full h-12"
          />
        </div> */}
      </div>
    </section>
  );
}
