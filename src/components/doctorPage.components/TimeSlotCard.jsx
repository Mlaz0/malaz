import { formatDate, formatPrice, formatTime } from "@/utils/formatOperations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  useCreateBooking,
  useCreateDirectPayment,
} from "@/hooks/Actions/booking/useCurdsBooking";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";
import PaymentChoiceModal from "./PaymentChoiceModal";
import Swal from "sweetalert2";
import { useState } from "react";

const TimeSlotCard = ({ slot }) => {
  const { mutate: createBooking } = useCreateBooking();
  const { mutate: createDirectPayment } = useCreateDirectPayment();
  const { data: userData } = useGetUserProfile();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const walletBalance = userData?.data?.data?.walletBalance || 0;
  console.log(slot);

  const handleWalletPayment = () => {
    // Close the payment choice modal first
    setShowPaymentModal(false);

    Swal.fire({
      title: "هل أنت متأكد من الحجز؟",
      text: "سيتم الدفع من المحفظة. لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احجز!",
      cancelButtonText: "إلغاء",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        createBooking(
          {
            data: {
              availabilityId: slot.id,
              paymentMethod: "wallet",
            },
          },
          {
            onSuccess: () => {
              Swal.fire("تم الحجز!", "تم حجز الجلسة بنجاح.", "success");
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

  const handleDirectPayment = () => {
    // Close the payment choice modal first
    setShowPaymentModal(false);

    // Direct payment without confirmation modal
    createDirectPayment(
      {
        data: {
          availabilityId: slot.id,
        },
      },
      {
        onSuccess: (response) => {
          // Check if sessionUrl exists in the response
          const sessionUrl = response?.data?.data?.sessionUrl;

          if (sessionUrl) {
            // Redirect user to the payment session URL
            window.open(sessionUrl, "_blank");
          } else {
            Swal.fire("تم الحجز!", "تم حجز الجلسة بنجاح.", "success");
          }
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
  };

  const handleBookNow = () => {
    setShowPaymentModal(true);
  };

  return (
    <>
      <Card
        className={`w-full transition-all duration-200 hover:shadow-md ${
          !slot.status ? "opacity-60" : "hover:scale-[1.02]"
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">
                {formatDate(slot.date)}
              </span>
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
            onClick={handleBookNow}
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

      {/* Payment Choice Modal */}
      <PaymentChoiceModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onWalletPayment={handleWalletPayment}
        onDirectPayment={handleDirectPayment}
        slotPrice={slot.price}
        walletBalance={walletBalance}
      />
    </>
  );
};

export default TimeSlotCard;
