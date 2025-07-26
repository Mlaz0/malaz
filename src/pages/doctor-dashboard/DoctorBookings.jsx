import { useEffect, useState } from "react";
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
import { Check, X, Calendar, Clock, User, Link2, Link } from "lucide-react";
import {
  useCancelBooking,
  useCompleteBooking,
  useGetBookingMeetLink,
  useGetDoctorbooking,
} from "@/hooks/Actions/booking/useCurdsBooking";
import AdminPagination from "@/components/admin.components/AdminPagination";
import Swal from "sweetalert2";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  useCreateDiagnosis,
  useGetDoctorDiagnosis,
} from "@/hooks/Actions/diagnosis/useDiagnosisCruds";
import axios from "axios";
import { formatDate, formatTime } from "@/utils/formatOperations";
import {
  PreviewDetailsDialog,
  ShowDiagnosisDialog,
} from "@/components/doctor-dashboard/bookingDialoges";

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
  const [diagnosis, setDiagnosis] = useState("");
  const [diagnosisReportId, setDiagnosisReportId] = useState("");
  const [bookingIdForMeeting, setBookingIdForMeeting] = useState("");

  const { mutate: mutateCancel } = useCancelBooking();
  const { mutate: mutateComplete } = useCompleteBooking();
  const { mutate: mutateCreateDiagnosis } = useCreateDiagnosis();
  const { data: diagnosisReportRes, refetchReport } =
    useGetDoctorDiagnosis(diagnosisReportId);
  const { data: meetLinkRes, refetch: refetchMeetLink } =
    useGetBookingMeetLink(bookingIdForMeeting);
  const meetLink = meetLinkRes?.data?.data?.meetLink;

  const diagnosisReport = diagnosisReportRes?.data?.data?.reports[0];
  console.log(diagnosisReport);

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

  // Returns true if the current time is after the booking's endTime
  const readyToComplete = (booking) => {
    if (!booking?.endTime) return false;
    const end = new Date(booking?.endTime);
    const isReady = Date.now() + 3 * 60 * 60 * 1000 > end.getTime();
    return isReady;
  };
  const readyToGetLink = (booking) => {
    // if (!booking?.startTime) return false;
    const start = new Date(booking?.startTime);
    const end = new Date(booking?.endTime);
    const isReady =
      end.getTime() > Date.now() + 3 * 60 * 60 * 1000 &&
      Date.now() + 3 * 60 * 60 * 1000 > start.getTime() - 15 * 60 * 1000;
    return isReady;
  };

  useEffect(() => {
    refetchMeetLink();
  }, [bookingIdForMeeting]);

  useEffect(() => {
    refetchReport;
  }, [diagnosisReportId]);

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
          setSelectedBooking(null); // Close dialog
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

  const handleCompleteBooking = (bookingId) => {
    mutateComplete(
      {
        data: {
          // status: "completed",
          diagnosis: diagnosis,
        },
        id: `/${bookingId}/complete`,
      },
      {
        onSuccess: () => {
          Swal.fire("تم الاكتمال", "تم اكمال الجلسة بنجاح.", "success");
          setSelectedBooking(null); // Close dialog
        },
        onError: (error) => {
          Swal.fire(
            "خطأ!",
            error?.response?.data?.message || "فشل في عملية الاكتمال",
            "error"
          );
        },
      }
    );
    setDiagnosis("");
  };

  const handleCreateDiagnosis = (bookingId) => {
    mutateCreateDiagnosis({ id: bookingId, data: {} });
  };

  const handleShowDiagnosis = (id) => {
    setDiagnosisReportId(id);
  };

  const handleShowBookingDetails = (booking) => {
    setSelectedBooking(booking);
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
                      {booking.price} جنيه
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* Preview Dialog */}
                      <PreviewDetailsDialog
                        booking={booking}
                        selectedBooking={selectedBooking}
                        showBookingDetails={handleShowBookingDetails}
                        getStatusBadge={getStatusBadge}
                      />

                      {/* Analysis Button - only show for completed bookings */}
                      {booking.status === "completed" &&
                        !booking.isDiagnosed && (
                          <Button
                            className="bg-yellow-600 hover:bg-yellow-700"
                            onClick={() => handleCreateDiagnosis(booking._id)}
                          >
                            انشاء تحليل
                          </Button>
                        )}

                      {/*Show Diagnosis Button - only show for completed & diagnosed bookings */}
                      {booking.status === "completed" &&
                        booking.isDiagnosed && (
                          <ShowDiagnosisDialog
                            booking={booking}
                            diagnosisReport={diagnosisReport}
                            onShowDiagnosis={handleShowDiagnosis}
                          />
                        )}

                      {/* Get Link Button  */}
                      {booking.status === "confirmed" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              hidden={!readyToGetLink(booking)}
                              onClick={() =>
                                setBookingIdForMeeting(booking._id)
                              }
                            >
                              <Link />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>رابط الجلسة</DialogTitle>
                              <DialogDescription>
                                اضغط على الرابط أدناه للانضمام إلى الجلسة
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center gap-4 mt-4">
                              {meetLink ? (
                                <a
                                  href={meetLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline text-lg font-semibold"
                                >
                                  انضم إلى الجلسة
                                </a>
                              ) : (
                                <span className="text-gray-500">
                                  لا يوجد رابط متاح حالياً
                                </span>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}

                      {/* Complete Button - only show for confirmed bookings */}
                      {booking.status === "confirmed" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              hidden={!readyToComplete(booking)}
                            >
                              <Check className="h-4 w-4" />
                              إكمال
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>إكمال الحجز</DialogTitle>
                              <DialogDescription>
                                يرجى إدخال التشخيص لإكمال الحجز
                              </DialogDescription>
                            </DialogHeader>
                            <div>
                              <Label
                                htmlFor="diagnosis"
                                className="block text-right mb-2"
                              >
                                التشخيص
                              </Label>
                              <Textarea
                                id="diagnosis"
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                                placeholder="أدخل التشخيص..."
                                className="mb-4 text-right min-h-[100px]"
                                rows={4}
                              />
                              <div className="flex flex-row-reverse gap-2">
                                <Button
                                  variant="default"
                                  onClick={() =>
                                    handleCompleteBooking(booking._id)
                                  }
                                  disabled={!diagnosis.trim()}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  إكمال الحجز
                                </Button>
                                <DialogClose asChild>
                                  <Button variant="outline">إلغاء</Button>
                                </DialogClose>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}

                      {/* Cancel Dialog: only show if not confirmed or cancelled */}
                      {booking.status !== "cancelled" &&
                        booking.status !== "completed" && (
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
                                  <DialogClose asChild>
                                    <Button variant="outline">إلغاء</Button>
                                  </DialogClose>
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
