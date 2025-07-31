import DocProfileAccInfo from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileAccInfo";
import DocProfileCertifications from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileCertifications";
import DocProfileContactInfo from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileContactInfo";
import DocProfileHeaer from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileHeaer";
import DocProfilePracticeDetails from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfilePracticeDetails";
import DocProfileSpecializations from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileSpecializations";
import { DoctorReviews } from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DoctorReviews";
import { useGetDoctorDetails } from "@/hooks/Actions/doctors/useCrudsDoctors";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const { id } = useParams();

  const { data: doctorData, refetch } = useGetDoctorDetails(id);

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  return (
    <div className="container mx-auto  p-6 space-y-6">
      {/* Header Card */}
      <DocProfileHeaer doctorData={doctorData?.data?.data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <DocProfileContactInfo
          doctorData={doctorData?.data?.data}
          fromPatient={true}
        />

        {/* Specializations */}

        <DocProfileSpecializations doctorData={doctorData?.data?.data} />

        {/* Certifications */}
        <DocProfileCertifications doctorData={doctorData?.data?.data} />

        {/* Practice Details */}
        <DocProfilePracticeDetails doctorData={doctorData?.data?.data} />
      </div>

      {/* Reviews  */}
      <DoctorReviews
        reviews={doctorData?.data?.data?.doctorData?.ratings}
        ratingCount={doctorData?.data?.data?.doctorData?.ratingCount}
        ratingNumber={doctorData?.data?.data?.doctorData?.ratingNumber}
      />
    </div>
  );
};

export default DoctorDetails;
