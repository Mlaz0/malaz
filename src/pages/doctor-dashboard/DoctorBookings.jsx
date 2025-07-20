import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye, Check, X, Calendar, Clock, User, DollarSign } from "lucide-react";
import {
  useCancelBooking,
  useConfirmBooking,
  useGetDoctorbooking,
} from "@/hooks/Actions/booking/useCurdsBooking";
import AdminPagination from "@/components/admin.components/AdminPagination";
import Swal from "sweetalert2";

export default function DoctorBookingsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: bookingRes } = useGetDoctorbooking(page, limit);
  const doctorBookingsData = bookingRes?.data?.data;
  const bookings = doctorBookingsData?.bookings || [];
  const currentPage = doctorBookingsData?.currentPage || 1;
  const totalPages = doctorBookingsData?.totalPages || 1;
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const { mutate: mutateCancel } = useCancelBooking();
  const { mutate: mutateConfirm } = useConfirmBooking();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "في الانتظار", variant: "secondary" },
      confirmed: { label: "مؤكد", variant: "default" },
      cancelled: { label: "ملغي", variant: "destructive" },
      completed: { label: "مكتمل", variant: "outline" },
    };

    const config = statusConfig[status] || {
      label: status,
      variant: "secondary",
    };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      paid: { label: "مدفوع", variant: "default" },
      pending: { label: "في الانتظار", variant: "secondary" },
      refunded: { label: "مسترد", variant: "outline" },
    };

    const config = statusConfig[status] || {
      label: status,
      variant: "secondary",
    };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleConfirmBooking = (bookingId) => {
    mutateConfirm(
      {
        data: {
          status: "confirmed",
        },
        id: `/${bookingId}/confirm`,
      },
      {
        onSuccess: () => {
          Swal.fire("تم التأكيد", "تم تأكيد الحجز بنجاح.", "success");
        },
        onError: (error) => {
          Swal.fire(
            "خطأ!",
            error?.response?.data?.message || "فشل في عملية التأكيد",
            "error"
          );
        },
      }
    );
  };

  const handleCancelBooking = (bookingId) => {
    mutateCancel(
      {
        data: {
          status: "cancelled",
          cancelReason: cancelReason,
        },
        id: `/${bookingId}/cancel`,
      },
      {
        onSuccess: () => {
          Swal.fire("تم الإلغاء!", "تم إلغاء الحجز بنجاح.", "success");
          setCancelReason("");
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
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <div>
                        <div className="font-medium">
                          {booking.patientId.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.patientId.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <div>
                        <div>{formatDate(booking.appointmentDate)}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(booking.startTime)} -{" "}
                          {formatTime(booking.endTime)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    {getPaymentStatusBadge(booking.paymentStatus)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {booking.price} جنيه
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* Preview Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>تفاصيل الحجز</DialogTitle>
                            <DialogDescription>
                              معلومات مفصلة عن الحجز والمريض
                            </DialogDescription>
                          </DialogHeader>
                          {selectedBooking && (
                            <div className="grid gap-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-semibold">
                                    اسم المريض
                                  </Label>
                                  <p>{selectedBooking.patientId.name}</p>
                                </div>
                                <div>
                                  <Label className="font-semibold">
                                    البريد الإلكتروني
                                  </Label>
                                  <p>{selectedBooking.patientId.email}</p>
                                </div>
                                <div>
                                  <Label className="font-semibold">الجنس</Label>
                                  <p>
                                    {selectedBooking.patientId.gender === "male"
                                      ? "ذكر"
                                      : "أنثى"}
                                  </p>
                                </div>
                                <div>
                                  <Label className="font-semibold">
                                    تاريخ الميلاد
                                  </Label>
                                  <p>
                                    {formatDate(
                                      selectedBooking.patientId.dateOfBirth
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <Label className="font-semibold">
                                    تاريخ الموعد
                                  </Label>
                                  <p>
                                    {formatDate(
                                      selectedBooking.appointmentDate
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <Label className="font-semibold">
                                    وقت الموعد
                                  </Label>
                                  <p>
                                    {formatTime(selectedBooking.startTime)} -{" "}
                                    {formatTime(selectedBooking.endTime)}
                                  </p>
                                </div>
                                <div>
                                  <Label className="font-semibold">
                                    الحالة
                                  </Label>
                                  <p>
                                    {getStatusBadge(selectedBooking.status)}
                                  </p>
                                </div>
                                <div>
                                  <Label className="font-semibold">السعر</Label>
                                  <p>{selectedBooking.price} جنيه</p>
                                </div>
                              </div>
                              {selectedBooking.cancelReason && (
                                <div>
                                  <Label className="font-semibold">
                                    سبب الإلغاء
                                  </Label>
                                  <p>{selectedBooking.cancelReason}</p>
                                </div>
                              )}
                              {selectedBooking.diagnosis && (
                                <div>
                                  <Label className="font-semibold">
                                    التشخيص
                                  </Label>
                                  <p>{selectedBooking.diagnosis}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {/* Confirm Button */}
                      {booking.status === "pending" && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleConfirmBooking(booking._id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Cancel Dialog: only show if not confirmed or cancelled */}
                      {booking.status !== "cancelled" &&
                        booking.status !== "confirmed" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>إلغاء الحجز</DialogTitle>
                                <DialogDescription>
                                  هل أنت متأكد من إلغاء هذا الحجز؟ يرجى إدخال
                                  سبب الإلغاء.
                                </DialogDescription>
                              </DialogHeader>
                              <div>
                                <Label
                                  htmlFor="cancelReason"
                                  className="block text-right mb-2"
                                >
                                  سبب الإلغاء
                                </Label>
                                <Textarea
                                  id="cancelReason"
                                  value={cancelReason}
                                  onChange={(e) =>
                                    setCancelReason(e.target.value)
                                  }
                                  placeholder="أدخل سبب الإلغاء..."
                                  className="mb-4 text-right"
                                />
                                <div className="flex flex-row-reverse gap-2">
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleCancelBooking(booking._id)
                                    }
                                    disabled={!cancelReason.trim()}
                                  >
                                    تأكيد الإلغاء
                                  </Button>
                                  <Button variant="outline">إلغاء</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
