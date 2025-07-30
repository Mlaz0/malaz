import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Filter, Loader2 } from "lucide-react";
import { useGetDoctorbooking } from "@/hooks/Actions/booking/useCurdsBooking";
import AdminPagination from "@/components/admin.components/AdminPagination";
import { BookingRow } from "@/components/doctor-dashboard/BookingRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function DoctorBookingsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const limit = 10;

  const { data: bookingRes, isPending } = useGetDoctorbooking(
    page,
    limit,
    status === "all" ? undefined : status
  );
  const doctorBookingsData = bookingRes?.data?.data;
  const bookings = doctorBookingsData?.bookings || [];
  const currentPage = doctorBookingsData?.currentPage || 1;
  const totalPages = doctorBookingsData?.totalPages || 1;
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleShowBookingDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1); // Reset to first page when filter changes
  };

  const handleClearFilter = () => {
    setStatus("all");
    setPage(1);
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      // pending: "في الانتظار",
      confirmed: "المؤكدة",
      cancelled: "الملغية",
      completed: "المكتملة",
    };
    return statusLabels[status] || status;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">حجوزات المرضى</h1>
        <p className="text-muted-foreground">إدارة مواعيد المرضى والحجوزات</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            قائمة الحجوزات
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filter Section */}
          <div className="mb-6 flex items-center gap-4 justify-end">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">تصفية حسب الحالة:</span>
            </div>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحجوزات</SelectItem>
                {/* <SelectItem value="pending">في الانتظار</SelectItem> */}
                <SelectItem value="confirmed">مؤكد</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
              </SelectContent>
            </Select>
            {status !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilter}
                className="text-xs"
              >
                إلغاء التصفية
              </Button>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-4 text-sm text-muted-foreground text-right">
            {status === "all"
              ? `عرض جميع الحجوزات (${bookings.length} حجز)`
              : `عرض الحجوزات ${getStatusLabel(status)} (${
                  bookings.length
                } حجز)`}
          </div>

          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">المريض</TableHead>
                <TableHead className="text-right">التاريخ والوقت</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">حالة الدفع</TableHead>
                <TableHead className="text-right">السعر</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    {/* <Skeleton className="h-8 w-full" /> */}
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <p className="text-sm">جاري التحميل...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingRow
                    key={booking._id}
                    booking={booking}
                    selectedBooking={selectedBooking}
                    onShowBookingDetails={handleShowBookingDetails}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Calendar className="h-8 w-8" />
                      <p className="text-sm">
                        {status === "all"
                          ? "لا توجد حجوزات متاحة"
                          : `لا توجد حجوزات ${getStatusLabel(status)} متاحة`}
                      </p>
                      {status !== "all" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearFilter}
                          className="mt-2"
                        >
                          عرض جميع الحجوزات
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
