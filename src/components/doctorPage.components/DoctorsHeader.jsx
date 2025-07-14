
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const DoctorsHeader = ({
  searchTerm,
  setSearchTerm,
  specialties,
  selectedSpecialty,
  setSelectedSpecialty,
}) => {
  return (
    <div
      className={`bg-card/80 backdrop-blur-sm border-b py-8`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            أخصائيين الصحة النفسية
          </h1>
          <p className="text-muted-foreground text-lg">
            ابحث عن أطباء ومعالجين متخصصين لاحتياجاتك النفسية
          </p>
        </div>

        <div className="relative flex-1 max-w-md mx-auto py-5 ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="ابحث عن أطباء أو تخصصات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 focus-ring w-full rounded-full h-12"
          />
        </div>


        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedSpecialty("all")}
              className={`px-6 py-3 cursor-pointer rounded-xl font-medium transition-colors focus-ring ${selectedSpecialty === "all"
                ? "bg-primary text-primary-foreground shadow-primary"
                : "bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground border border-border"
                }`}
            >
              جميع التخصصات
            </button>
            {specialties?.map((specialty) => (

              <button
                key={specialty._id}
                onClick={() => setSelectedSpecialty(specialty.name)}
                className={`px-6 py-3 cursor-pointer rounded-xl font-medium transition-colors focus-ring ${selectedSpecialty === specialty.name
                  ? "bg-primary text-primary-foreground shadow-primary"
                  : "bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground border border-border"
                  }`}
              >
                {specialty.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};