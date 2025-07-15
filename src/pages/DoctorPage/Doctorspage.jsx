import { DoctorsHeader } from "@/components/doctorPage.components/DoctorsHeader";
import { DoctorsList } from "@/components/doctorPage.components/DoctorsList";
import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
import { useGetAllDoctors } from "@/hooks/Actions/doctors/useCrudsDoctors";
import { useState } from "react";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const {
    data: doctors,
    isPending: doctorsLoading,
    isError: doctorsError,
  } = useGetAllDoctors();

  const { data: specialties, isError: specialtiesError } =
    useGetAllCategories();

  console.log(doctors);

  const filteredDoctors = doctors?.doctors?.filter((doctor) => {
    const searchMatches = (searchTerm) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.doctorData?.specializations?.some((spec) =>
        spec.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const specialtyMatches = (selectedSpecialty) =>
      selectedSpecialty === "all" ||
      doctor.doctorData?.specializations?.some(
        (spec) => spec.name === selectedSpecialty
      );

    return searchMatches(searchTerm) && specialtyMatches(selectedSpecialty);
  });

  if (doctorsError || specialtiesError) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold mb-2">حدث خطأ</h3>
        <p className="text-muted-foreground">
          {doctorsError || specialtiesError}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <DoctorsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        specialties={specialties}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
      />

      {doctorsLoading ? (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-12  w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <DoctorsList filteredDoctors={filteredDoctors} doctors={doctors} />
      )}
    </div>
  );
}
