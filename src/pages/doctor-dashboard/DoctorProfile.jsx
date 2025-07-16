import DocProfileAccInfo from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileAccInfo";
import DocProfileCertifications from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileCertifications";
import DocProfileContactInfo from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileContactInfo";
import DocProfileHeaer from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileHeaer";
import DocProfilePracticeDetails from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfilePracticeDetails";
import DocProfileSpecializations from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileSpecializations";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";

export default function DoctorProfile() {
  const { data: doctorData } = useGetUserProfile();

  return (
    <div className="container mx-auto  p-6 space-y-6">
      {/* Header Card */}
      <DocProfileHeaer doctorData={doctorData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <DocProfileContactInfo doctorData={doctorData} />

        {/* Specializations */}

        <DocProfileSpecializations doctorData={doctorData} />

        {/* Certifications */}
        <DocProfileCertifications doctorData={doctorData} />

        {/* Practice Details */}
        <DocProfilePracticeDetails doctorData={doctorData} />
      </div>

      {/* Account Information */}
      <DocProfileAccInfo doctorData={doctorData} />
    </div>
  );
}
