import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const DoctorsHeader = ({
  specialties,

  handleQueryParams,
  searchParams,
}) => {
  return (
    <div className={`bg-card/80 backdrop-blur-sm border-b py-8`}>
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            أخصائيين الصحة النفسية
          </h1>
          <p className="text-muted-foreground text-lg">
            ابحث عن أطباء ومعالجين متخصصين لاحتياجاتك النفسية
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleQueryParams("all")}
              className={`px-6 py-3 cursor-pointer rounded-xl font-medium transition-colors focus-ring ${
                !searchParams.get("specialization")
                  ? "bg-primary text-primary-foreground shadow-primary"
                  : "bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground border border-border"
              }`}
            >
              جميع التخصصات
            </button>
            {specialties?.data?.data?.categories?.map((specialty) => (
              <button
                key={specialty._id}
                onClick={() => handleQueryParams(specialty._id)}
                className={`px-6 py-3 cursor-pointer rounded-xl font-medium transition-colors focus-ring ${
                  searchParams.get("specialization") === specialty._id
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
