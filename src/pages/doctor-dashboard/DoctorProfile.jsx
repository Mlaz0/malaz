import DocProfileAccInfo from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileAccInfo";
import DocProfileCertifications from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileCertifications";
import DocProfileContactInfo from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileContactInfo";
import DocProfileHeaer from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileHeaer";
import DocProfileSpecializations from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileSpecializations";
import {
  Wallet,
  CheckCircle,
  Clock as ClockIcon,
  AlertTriangle,
} from "lucide-react";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";

export default function DoctorProfile() {
  const { data: doctorData } = useGetUserProfile();
  const doctor = doctorData?.data?.data;
  const walletAmount = doctor?.walletBalance ?? 0;

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: {
        color: "bg-green-100 text-green-800",
        text: "موافق",
        icon: CheckCircle,
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        text: "في الانتظار",
        icon: ClockIcon,
      },
      suspended: {
        color: "bg-red-100 text-red-800",
        text: "معلق",
        icon: AlertTriangle,
      },
      canceled: {
        color: "bg-red-100 text-red-800",
        text: "مرفوض",
        icon: AlertTriangle,
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        <IconComponent className="h-4 w-4" />
        {config.text}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section with Status */}
      <div className="bg-white rounded-lg shadow-lg p-6 border">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={doctor?.userImg?.url || "/placeholder.svg"}
                alt={doctor?.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
              />
              {doctor?.isEmailVerified && (
                <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-green-500 bg-white rounded-full" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {doctor?.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                {getStatusBadge(doctor?.doctorData?.currentStatus)}
                <span className="text-sm text-gray-600">
                  {doctor?.doctorData?.statusMessage}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{doctor?.email}</p>
            </div>
          </div>

          {/* Wallet Card */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 flex items-center gap-4 border border-green-200 min-w-[260px] justify-center">
              <Wallet className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-lg font-bold text-green-700">محفظتك</div>
                <div className="text-2xl font-extrabold text-green-800">
                  {walletAmount} جنيه مصري
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <DocProfileContactInfo doctorData={doctor} />

        {/* Specializations */}
        <DocProfileSpecializations doctorData={doctor} />

        {/* Account Information */}
        <DocProfileAccInfo doctorData={doctor} />

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow p-6 border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            معلومات إضافية
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">
                التصنيفات المقترحة
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {doctor?.doctorData?.suggestedCategory?.length ? (
                  doctor.doctorData.suggestedCategory.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                    >
                      {category}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    لا توجد تصنيفات مقترحة
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                عدد الجلسات المتاحة
              </span>
              <span className="text-sm text-gray-900">
                {doctor?.doctorData?.availability?.length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                عدد الشهادات
              </span>
              <span className="text-sm text-gray-900">
                {doctor?.doctorData?.certifications?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <DocProfileCertifications doctorData={doctor} />
    </div>
  );
}
