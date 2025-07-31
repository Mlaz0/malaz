// import { DoctorsHeader } from "@/components/doctorPage.components/DoctorsHeader";
// import { DoctorsList } from "@/components/doctorPage.components/DoctorsList";
// import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
// import { useGetApprovedDoctors } from "@/hooks/Actions/doctors/useCrudsDoctors";
// import { useState } from "react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { useSearchParams } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import DoctorsGridSkeleton from "@/components/Skeleton/DoctorCardSkeleton";

// export default function DoctorsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const {
//     data: doctors,
//     isPending: doctorsLoading,
//     isError: doctorsError,
//     refetch: refetchDoctors,
//   } = useGetApprovedDoctors(page, limit, searchParams.get("specialization"));

//   const { data: specialties, isError: specialtiesError } =
//     useGetAllCategories();

//   const currentPage = doctors?.data?.data?.currentPage || 1;
//   const totalPages = doctors?.data?.data?.totalPages || 1;

//   const handlePagination = (newPage) => {
//     if (newPage < 1 || newPage > totalPages) return;
//     setPage(newPage);
//   };

//   const handleQueryParams = (specializaId) => {
//     if (specializaId === "all") {
//       setSearchParams({});
//       setPage(1);
//       refetchDoctors();
//     } else {
//       setSearchParams({
//         specialization: specializaId,
//       });
//       setPage(1);
//       refetchDoctors();
//     }
//   };

//   if (doctorsError || specialtiesError) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-6xl mb-4">⚠️</div>
//         <h3 className="text-xl font-semibold mb-2">حدث خطأ</h3>
//         <p className="text-muted-foreground">
//           {doctorsError || specialtiesError}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pb-10 bg-gradient-to-br from-background via-muted/20 to-accent/10">
//       <DoctorsHeader
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         specialties={specialties}
//         handleQueryParams={handleQueryParams}
//         searchParams={searchParams}
//       />

//       {doctorsLoading ? (
//         <DoctorsGridSkeleton />
//       ) : (
//         <>
//           <DoctorsList
//             filteredDoctors={doctors?.data?.data?.doctors}
//             doctors={doctors}
//           />

//           {doctors?.length > 0 && (
//             <Pagination className="mt-4" disabled={doctorsLoading}>
//               <PaginationContent>
//                 <PaginationItem>
//                   <PaginationPrevious
//                     className={cn(
//                       "cursor-pointer bg-card shadow hover:text-white"
//                     )}
//                     onClick={() => handlePagination(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   />
//                 </PaginationItem>

//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <PaginationItem key={i}>
//                     <PaginationLink
//                       className={cn(
//                         "cursor-pointer bg-card shadow hover:text-white",
//                         currentPage === i + 1 && "bg-primary text-white"
//                       )}
//                       isActive={currentPage === i + 1}
//                       onClick={() => handlePagination(i + 1)}
//                     >
//                       {i + 1}
//                     </PaginationLink>
//                   </PaginationItem>
//                 ))}

//                 <PaginationItem>
//                   <PaginationNext
//                     className={cn(
//                       "cursor-pointer bg-card shadow hover:text-white"
//                     )}
//                     onClick={() => handlePagination(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                   />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

import { DoctorsHeader } from "@/components/doctorPage.components/DoctorsHeader";
import { DoctorsList } from "@/components/doctorPage.components/DoctorsList";
import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
import { useGetApprovedDoctors } from "@/hooks/Actions/doctors/useCrudsDoctors";
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
import DoctorsGridSkeleton from "@/components/Skeleton/DoctorCardSkeleton";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [ratingSort, setRatingSort] = useState(null);

  const {
    data: doctors,
    isPending: doctorsLoading,
    isError: doctorsError,
    refetch: refetchDoctors,
  } = useGetApprovedDoctors(page, limit, searchParams.get("specialization"));

  const { data: specialties, isError: specialtiesError } =
    useGetAllCategories();

  console.log(doctors);

  const currentPage = doctors?.data?.data?.currentPage || 1;
  const totalPages = doctors?.data?.data?.totalPages || 1;

  const filteredDoctors = () => {
    let result = doctors?.data?.data?.doctors || [];

    if (ratingSort) {
      result = result.filter((doctor) => doctor.doctorData?.ratingNumber > 0);
    }

    if (ratingSort === "desc") {
      return [...result].sort(
        (a, b) => b.doctorData?.ratingNumber - a.doctorData?.ratingNumber
      );
    }
    if (ratingSort === "asc") {
      return [...result].sort(
        (a, b) => a.doctorData?.ratingNumber - b.doctorData?.ratingNumber
      );
    }
    return result;
  };

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

  const handleRatingSort = (sortType) => {
    setRatingSort(sortType);
  };

  const clearRatingSort = () => {
    setRatingSort(null);
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

      <div className="container mx-auto px-4 mt-4 flex gap-2 flex-wrap">
        <Button
          variant={ratingSort === "desc" ? "default" : "outline"}
          onClick={() => handleRatingSort("desc")}
          className="flex items-center gap-2"
        >
          <ArrowUpNarrowWide size={16} />
          الأعلى تقييماً
        </Button>
        <Button
          variant={ratingSort === "asc" ? "default" : "outline"}
          onClick={() => handleRatingSort("asc")}
          className="flex items-center gap-2"
        >
          <ArrowDownNarrowWide size={16} />
          الأقل تقييماً
        </Button>
        {ratingSort && (
          <Button variant="ghost" onClick={clearRatingSort}>
            إلغاء التصفية
          </Button>
        )}
      </div>

      {doctorsLoading ? (
        <DoctorsGridSkeleton />
      ) : (
        <>
          <DoctorsList filteredDoctors={filteredDoctors()} doctors={doctors} />

          {doctors?.data?.data?.doctors?.length > 0 && (
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
          )}
        </>
      )}
    </div>
  );
}
