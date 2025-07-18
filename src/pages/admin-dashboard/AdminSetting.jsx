import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";

const AdminSetting = () => {
  const { data: userRes } = useGetUserProfile();
  const user = userRes?.data?.data || null;
  if (!user) return <LoadingSpinner />;

  return (
    <div className="mt-8 px-8">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user.userImg?.url || "/placeholder.svg"}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
          <p className="text-lg text-muted-foreground">{user.email}</p>
          <span className="inline-block mt-2 px-4 py-1 text-sm rounded-full bg-primary text-primary-foreground">
            {user.role === "admin" ? "مدير" : user.role}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span className="font-medium">رقم الهاتف: </span>
          {user.phone}
        </div>
        <div>
          <span className="font-medium">تاريخ الميلاد: </span>
          {new Date(user.dateOfBirth).toLocaleDateString("ar-SA")}
        </div>
        <div>
          <span className="font-medium">تاريخ الإنشاء: </span>
          {new Date(user.createdAt).toLocaleDateString("ar-SA")}
        </div>
        <div>
          <span className="font-medium">الجنس: </span>
          {user.gender === "male" ? "ذكر" : "أنثى"}
        </div>
        <div>
          <span className="font-medium">البريد مفعل: </span>
          {user.isEmailVerified ? "نعم" : "لا"}
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;
