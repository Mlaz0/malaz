
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { DoctorCard } from "./DoctorCard";

export const DoctorsList = ({
  filteredDoctors,
  doctors,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">
          عرض {filteredDoctors?.length} من {doctors?.doctors?.length} طبيب
        </p>
        <Button
          variant="outline"
          size="sm"
          className="focus-ring bg-transparent hover:scale-105 transition-transform"
        >
          <Filter className="h-4 w-4 mr-2" />
          فلتر متقدم
        </Button>
      </div>

      <div
        className={`grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3`}
      >
        {filteredDoctors?.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
          />
        ))}
      </div>

      {filteredDoctors?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🧠</div>
          <h3 className="text-xl font-semibold mb-2">لا يوجد أطباء</h3>
          <p className="text-muted-foreground">
            حاول تعديل معايير البحث أو الفلاتر
          </p>
        </div>
      )}
    </div>
  );
};