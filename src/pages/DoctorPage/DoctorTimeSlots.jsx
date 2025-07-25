import { Separator } from "@/components/ui/separator";
import { useGetDoctorDetails } from "@/hooks/Actions/doctors/useCrudsDoctors";
import { Clock, User } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeSlotCard from "@/components/doctorPage.components/TimeSlotCard";
import DoctorDetailsForSlots from "@/components/doctorPage.components/DoctorDetailsForSlots";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function DoctorTimeSlots() {
  const { id } = useParams();
  const {
    data: doctorDataRes,
    isPending,
    doctorsError,
    refetch,
  } = useGetDoctorDetails(id);
  const navigate = useNavigate();

  const { user, token, handleLogout } = useAuth();

  const doctorData = doctorDataRes?.data?.data;
  const availability = doctorData?.doctorData?.availability || [];
  const freeAvailability = availability.filter(
    (slot) => slot.status === "idle"
  );

  const timeSlots = freeAvailability.map((slot) => ({
    id: slot._id,
    date: slot.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    price: slot.price,
    available: slot.status,
    status: slot.status,
  }));

  const logOut = () => {
    handleLogout();
    navigate("/auth/login");
  };

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (isPending) {
    return (
      <div className="container mx-auto min-h-screen flex items-center justify-center px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="mr-2">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (doctorsError || !doctorData) {
    return (
      <div className="container mx-auto min-h-screen flex items-center justify-center px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            خطأ في تحميل بيانات الطبيب
          </h3>
          <p className="text-muted-foreground">يرجى المحاولة مرة أخرى لاحقاً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Doctor Details Section */}
      <DoctorDetailsForSlots doctorData={doctorData} />

      <Separator className="my-8" />

      {user?.role === "patient" && token ? (
        timeSlots.length > 0 ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-center mb-2">
                المواعيد المتاحة
              </h1>
              <p className="text-muted-foreground text-center">
                اختر الموعد المناسب لك واحجز الآن
              </p>
            </div>
            <div className="mb-8">
              {/* <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                المواعيد المتاحة ({timeSlots.length})
              </h2> */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeSlots.map((slot) => (
                  <TimeSlotCard key={slot.id} slot={slot} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h4 className="text-lg font-medium">لا توجد مواعيد متاحة حالياً</h4>
            <p className="text-muted-foreground mt-2">
              يرجى التحقق لاحقاً أو الاتصال بالدعم الفني
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-8 space-y-3">
          <h4 className="text-lg font-medium">
            سجل دخول كـ مريض للوصول إلى المواعيد
          </h4>
          <Button variant="destructive" onClick={logOut}>
            سجل خروج
          </Button>
        </div>
      )}
    </div>
  );
}
