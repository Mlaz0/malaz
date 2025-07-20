import { useGetUserbooking } from "@/hooks/Actions/booking/useCurdsBooking";
import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import BookingCard from "@/components/layout/dashboard/user-dashboard/BookingUserPage/BookingCard";
import BookingCardSkeleton from "@/components/Skeleton/BookingCardSkeleton";

const BookingUserPage = () => {
  const { data, isPending } = useGetUserbooking();
  const booking = data?.data?.data?.bookings;

  const bookingsToDisplay = booking;

  return (
    <div className="max-w-6xl mx-auto p-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold ">حجوزاتي</h1>
        </div>
        <p className="">عرض و إدارة مواعيدك القادمة وال السابقة</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm ">المجموع</p>
              <p className="text-2xl font-bold ">
                {bookingsToDisplay?.length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm ">النشط</p>
              <p className="text-2xl font-bold ">
                {bookingsToDisplay?.filter(
                  (b) => b.status === "confirmed" || b.status === "pending"
                ).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm ">المدربين</p>
              <p className="text-2xl font-bold ">
                {new Set(bookingsToDisplay?.map((b) => b.doctorId._id)).size ||
                  0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {isPending ? (
          <BookingCardSkeleton />
        ) : bookingsToDisplay && bookingsToDisplay.length > 0 ? (
          bookingsToDisplay.map((bookingItem) => (
            <BookingCard key={bookingItem._id} booking={bookingItem} />
          ))
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">لايوجد حجوزات</h3>
            <p className="text-gray-500">لم تقم بحجز اي مواعيد بعد.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingUserPage;
