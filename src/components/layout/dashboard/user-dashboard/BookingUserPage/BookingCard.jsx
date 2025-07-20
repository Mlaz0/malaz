import React, { useState } from "react";
import { Clock, MapPin, Calendar, User, Stethoscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Swal from "sweetalert2";
import { useCancelBooking } from "@/hooks/Actions/booking/useCurdsBooking";

const BookingCard = ({ booking }) => {
  const [cancelReason, setCancelReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorInput, setErrorInput] = useState(null);
  const { mutate } = useCancelBooking();

  const handleCancelReason = (e) => {
    setCancelReason(e.target.value);
    setErrorInput(null);
  };

  const validateCancelReason = () => {
    if (!cancelReason.trim() || cancelReason.length < 10) {
      return "الرجاء إدخال سبب الإلغاء (10 أحرف على الأقل)";
    }
    return null;
  };

  const handleBlurCancelReason = () => {
    const error = validateCancelReason();
    setErrorInput(error);
  };

  const handleCancelBooking = () => {
    setIsOpen(true);

    const error = validateCancelReason();
    if (error) {
      setErrorInput(error);
      return;
    }

    setErrorInput(null);

    Swal.fire({
      title: "هل أنت متأكد من إلغاء الحجز؟",
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، إلغاء!",
      cancelButtonText: "إلغاء",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(
          {
            data: {
              status: "cancelled",
              cancelReason: cancelReason,
            },
            id: `/${booking._id}/cancel`,
          },
          {
            onSuccess: () => {
              Swal.fire("تم الإلغاء!", "تم إلغاء الحجز بنجاح.", "success");
              setIsOpen(false);
              setCancelReason("");
              setErrorInput(null);
            },
            onError: (error) => {
              Swal.fire(
                "خطأ!",
                error?.response?.data?.message || "فشل في عملية الإلغاء",
                "error"
              );
            },
          }
        );
      } else {
        setIsOpen(false);
        setCancelReason("");
        setErrorInput(null);
      }
    });
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end.getTime() - start.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatDateTime = (dateTimeString) => {
    const dt = new Date(dateTimeString);
    const date = dt.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = dt.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { date, time };
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPaymentBadge = (paymentStatus) => {
    const styles = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[paymentStatus] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const isCancellationAllowed = () => {
    if (booking.status !== "pending") return false;
    const now = new Date();
    const startTime = new Date(booking.startTime);
    const diffInHours = (startTime - now) / (1000 * 60 * 60);
    return diffInHours >= 3;
  };

  const duration = calculateDuration(booking.startTime, booking.endTime);
  const startDateTime = formatDateTime(booking.startTime);
  const endDateTime = formatDateTime(booking.endTime);
  const showCancelButton = isCancellationAllowed();

  return (
    <div className="rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200 ">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                booking.status
              )}`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getPaymentBadge(
                booking.paymentStatus
              )}`}
            >
              Payment:{" "}
              {booking.paymentStatus.charAt(0).toUpperCase() +
                booking.paymentStatus.slice(1)}
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{booking.price}</p>
            <p className="text-sm text-gray-500">سعر الجلسة</p>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex gap-4">
            {booking.doctorId.userImg?.url ? (
              <img
                src={booking.doctorId.userImg.url}
                alt={booking.doctorId.name}
                className="w-16 h-16 rounded-full object-cover border-2 "
              />
            ) : (
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">
                Dr. {booking.doctorId.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {booking.doctorId.email}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{booking.doctorId.doctorData.clinicLocation}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center shadow-sm border py-2 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">التخصصات</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {booking.doctorId.doctorData.specializations.map((spec) => (
                <span
                  key={spec.id}
                  className="px-2 py-1 bg-primary text-white text-xs rounded-md"
                >
                  {spec.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-4 border border-border " />

        {/* Session Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-card rounded-lg">
          <div className="flex flex-col justify-center items-center shadow-sm border py-2 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">تاريخ الموعد</span>
            </div>
            <p className="text-sm font-medium">{startDateTime.date}</p>
          </div>

          <div className="flex flex-col justify-center items-center shadow-sm border py-2 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">وقت الجلسة</span>
            </div>
            <p className="text-sm font-medium">
              {startDateTime.time} - {endDateTime.time}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center shadow-sm border py-2 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-center">
                مدة الجلسة
              </span>
            </div>
            <p className="text-sm font-medium">{duration}</p>
          </div>
        </div>

        {/* Cancel Booking */}
        {showCancelButton && (
          <div className="mt-6 space-y-3 relative">
            {isOpen && (
              <>
                {errorInput && <p className="text-destructive">{errorInput}</p>}
                <textarea
                  value={cancelReason}
                  onChange={handleCancelReason}
                  onBlur={handleBlurCancelReason}
                  placeholder="الرجاء كتابة سبب الإلغاء..."
                  className="w-full p-3 border border-border rounded-lg"
                  rows={3}
                />
              </>
            )}
            <Button
              onClick={handleCancelBooking}
              variant="destructive"
              className="w-full sm:w-auto block ms-auto"
            >
              تأكيد الإلغاء
            </Button>
            {isOpen && (
              <X
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 absolute top-2 left-2 text-destructive cursor-pointer"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
