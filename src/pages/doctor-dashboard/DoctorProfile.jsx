import DocProfileAccInfo from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileAccInfo";
import DocProfileCertifications from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileCertifications";
import DocProfileContactInfo from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileContactInfo";
import DocProfileHeaer from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileHeaer";
import DocProfilePracticeDetails from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfilePracticeDetails";
import DocProfileSpecializations from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileSpecializations";
import { Wallet } from "lucide-react";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";

export default function DoctorProfile() {
  const { data: doctorData } = useGetUserProfile();
  const walletAmount = doctorData?.data?.data?.walletBalance ?? 0;

  return (
    <div className="container mx-auto  p-6 space-y-6">
      {/* Header Card with Wallet */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <DocProfileHeaer doctorData={doctorData?.data?.data} />
        </div>
        <div className="flex-shrink-0 w-full lg:w-auto">
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4 border min-w-[260px] justify-center h-full">
            <Wallet className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-lg font-bold text-green-700">محفظتك</div>
              <div className="text-2xl font-extrabold">{walletAmount} جنيه</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <DocProfileContactInfo doctorData={doctorData?.data?.data} />

        {/* Specializations */}
        <DocProfileSpecializations doctorData={doctorData?.data?.data} />

        {/* Certifications */}
        <DocProfileCertifications doctorData={doctorData?.data?.data} />

        {/* Practice Details */}
        {/* <DocProfilePracticeDetails doctorData={doctorData?.data?.data} /> */}

        {/* Account Information */}
        <DocProfileAccInfo doctorData={doctorData?.data?.data} />
      </div>
    </div>
  );
}
