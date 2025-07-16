import UserProfileContactInfo from "@/components/layout/dashboard/user-dashboard/UserProfile/UserProfileContactInfo";
import UserProfileHeaer from "@/components/layout/dashboard/user-dashboard/UserProfile/UserProfileHeaer";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";
import UserProfileAccInfo from "@/components/layout/dashboard/user-dashboard/UserProfile/UserProfileAccInfo";

export default function UserProfile() {
  const { data: userData } = useGetUserProfile();
  console.log(userData);

  return (
    <div className="container mx-auto  p-6 space-y-6">
      {/* Header Card */}
      <UserProfileHeaer userData={userData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <UserProfileContactInfo userData={userData} />
      </div>

      {/* Account Information */}
      <UserProfileAccInfo userData={userData} />
    </div>
  );
}
