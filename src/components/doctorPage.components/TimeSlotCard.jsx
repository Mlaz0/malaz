import { formatDate, formatPrice, formatTime } from "@/utils/formatOperations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCreateBooking } from "@/hooks/Actions/booking/useCurdsBooking";
import Swal from "sweetalert2";

const TimeSlotCard = ({ slot }) => {
  const { mutate } = useCreateBooking();
  console.log(slot);

  const handleCreateBooking = (id) => {
    Swal.fire({
      title: "هل أنت متأكد من الحجز؟",
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احجز!",
      cancelButtonText: "إلغاء",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(
          { data: { availabilityId: id } },
          {
            onSuccess: () => {
              Swal.fire("تم الحجز!", "تم حجز  بنجاح.", "success");
            },
            onError: (error) => {
              console.log(error);
              Swal.fire(
                "خطأ!",
                error?.response?.data?.message || "فشل في عملية الحجز",
                "error"
              );
            },
          }
        );
      }
    });
  };

  return (
    <Card
      className={`w-full transition-all duration-200 hover:shadow-md ${
        !slot.status ? "opacity-60" : "hover:scale-[1.02]"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">{formatDate(slot.date)}</span>
          </div>
          <Badge variant={slot.status ? "default" : "secondary"}>
            {slot.status ? "متاح" : "محجوز"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-600" />
            <span className="text-sm">
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">
              {formatPrice(slot.price)}
            </span>
          </div>
        </div>
        <Button
          className="w-full"
          type="submit"
          disabled={!slot.status}
          onClick={() => {
            handleCreateBooking(slot.id);
          }}
        >
          {slot.status ? (
            <>
              <User className="h-4 w-4 mr-2" />
              احجز الآن
            </>
          ) : (
            "غير متاح"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TimeSlotCard;
