import UserProfileContactInfo from "@/components/layout/dashboard/user-dashboard/UserProfile/UserProfileContactInfo";
import UserProfileHeaer from "@/components/layout/dashboard/user-dashboard/UserProfile/UserProfileHeaer";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";

export default function UserProfile() {
  const { data } = useGetUserProfile();

  return (
    <div className="container mx-auto  p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">الملف الشخصي </h2>

      {/* Header Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-card rounded-lg shadow-sm">
        <UserProfileHeaer userData={data?.data?.data} />

        {/* Contact Information */}
        <UserProfileContactInfo userData={data?.data?.data} />
      </div>
    </div>
  );
}
