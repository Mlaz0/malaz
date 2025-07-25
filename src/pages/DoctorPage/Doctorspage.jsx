import { DoctorsHeader } from "@/components/doctorPage.components/DoctorsHeader";
import { DoctorsList } from "@/components/doctorPage.components/DoctorsList";
import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
import { useGetAllDoctors } from "@/hooks/Actions/doctors/useCrudsDoctors";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: doctors,
    isPending: doctorsLoading,
    isError: doctorsError,
    refetch: refetchDoctors,
  } = useGetAllDoctors(page, limit, searchParams.get("specialization"));

  const { data: specialties, isError: specialtiesError } =
    useGetAllCategories();

  const currentPage = doctors?.data?.data?.currentPage || 1;
  const totalPages = doctors?.data?.data?.totalPages || 1;

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleQueryParams = (specializaId) => {
    if (specializaId === "all") {
      setSearchParams({});
      setPage(1);
      refetchDoctors();
    } else {
      setSearchParams({
        specialization: specializaId,
      });
      setPage(1);
      refetchDoctors();
    }
  };

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
    <div className="min-h-screen pb-10 bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <DoctorsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        specialties={specialties}
        handleQueryParams={handleQueryParams}
        searchParams={searchParams}
      />

      {doctorsLoading ? (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-12  w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <DoctorsList
            filteredDoctors={doctors?.data?.data?.doctors}
            doctors={doctors}
          />

          <Pagination className="mt-4" disabled={doctorsLoading}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={cn(
                    "cursor-pointer bg-card shadow hover:text-white"
                  )}
                  onClick={() => handlePagination(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className={cn(
                      "cursor-pointer bg-card shadow hover:text-white",
                      currentPage === i + 1 && "bg-primary text-white"
                    )}
                    isActive={currentPage === i + 1}
                    onClick={() => handlePagination(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  className={cn(
                    "cursor-pointer bg-card shadow hover:text-white"
                  )}
                  onClick={() => handlePagination(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
