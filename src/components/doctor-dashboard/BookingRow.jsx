import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
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
import { DialogClose } from "@radix-ui/react-dialog";
import Swal from "sweetalert2";
import {
  useCancelBooking,
  useCompleteBooking,
} from "@/hooks/Actions/booking/useCurdsBooking";
import {
  useCreateDiagnosis,
  useCreateDiagnosis as useCreateDiagnosisHook,
  useGetDoctorDiagnosis,
} from "@/hooks/Actions/diagnosis/useDiagnosisCruds";

export default function BookingRow({
  booking,
  formatDate,
  formatTime,
  getStatusBadge,
  getPaymentStatusBadge,
  readyToComplete,
  setSelectedBooking,
  diagnosisReport,
}) {
  const [cancelReason, setCancelReason] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [diagnosisReportId, setDiagnosisReportId] = useState(null);

  const { mutate: mutateCancel } = useCancelBooking();
  const { mutate: mutateComplete } = useCompleteBooking();
  const { mutate: mutateCreateDiagnosis } = useCreateDiagnosis();
  const { data: diagnosisReportRes } = useGetDoctorDiagnosis(diagnosisReportId);

  const currentDiagnosisReport = diagnosisReportRes?.data?.data?.reports[0];

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

  const handleCompleteBooking = (bookingId) => {
    mutateComplete(
      {
        data: {
          diagnosis: diagnosis,
        },
        id: `/${bookingId}/complete`,
      },
      {
        onSuccess: () => {
          Swal.fire("تم الاكتمال", "تم اكمال الجلسة بنجاح.", "success");
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
  };

  const handleCreateDiagnosis = (bookingId) => {
    mutateCreateDiagnosis({ id: bookingId, data: {} });
  };

  return (
    <TableRow key={booking._id}>
      <TableCell>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <div>
            <div className="font-medium">{booking.patientId.name}</div>
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
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(booking.status)}</TableCell>
      <TableCell>{getPaymentStatusBadge(booking.paymentStatus)}</TableCell>
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
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">اسم المريض</Label>
                    <p>{booking.patientId.name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">البريد الإلكتروني</Label>
                    <p>{booking.patientId.email}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">الجنس</Label>
                    <p>
                      {booking.patientId.gender === "male" ? "ذكر" : "أنثى"}
                    </p>
                  </div>
                  <div>
                    <Label className="font-semibold">تاريخ الميلاد</Label>
                    <p>{formatDate(booking.patientId.dateOfBirth)}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">تاريخ الموعد</Label>
                    <p>{formatDate(booking.appointmentDate)}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">وقت الموعد</Label>
                    <p>
                      {formatTime(booking.startTime)} -{" "}
                      {formatTime(booking.endTime)}
                    </p>
                  </div>
                  <div>
                    <Label className="font-semibold">الحالة</Label>
                    <p>{getStatusBadge(booking.status)}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">السعر</Label>
                    <p>{booking.price} جنيه</p>
                  </div>
                </div>
                {booking.cancelReason && (
                  <div>
                    <Label className="font-semibold">سبب الإلغاء</Label>
                    <p>{booking.cancelReason}</p>
                  </div>
                )}
                {booking.diagnosis && (
                  <div>
                    <Label className="font-semibold">التشخيص</Label>
                    <p>{booking.diagnosis}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Analysis Button - only show for completed bookings */}
          {booking.status === "completed" && !booking.isDiagnosed && (
            <Button
              className="bg-yellow-600 hover:bg-yellow-700"
              onClick={() => handleCreateDiagnosis(booking._id)}
            >
              انشاء تحليل
            </Button>
          )}

          {/*Show Diagnosis Button - only show for completed & diagnosed bookings */}
          {booking.status === "completed" && booking.isDiagnosed && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => setDiagnosisReportId(booking._id)}
                >
                  عرض التحليل
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg p-0">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center text-yellow-700">
                    تقرير التحليل
                  </DialogTitle>
                </DialogHeader>
                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg shadow p-6 space-y-6">
                  {/* Patient Details */}
                  <div className="mb-2">
                    <div className="text-sm font-bold text-gray-600 mb-2 border-b pb-1">
                      بيانات المريض
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-800">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">الاسم</span>
                        <span className="font-semibold">
                          {booking.patientId?.name}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          البريد الإلكتروني
                        </span>
                        <span className="font-semibold">
                          {booking.patientId?.email}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">الجنس</span>
                        <span className="font-semibold">
                          {booking.patientId?.gender === "male"
                            ? "ذكر"
                            : "أنثى"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          تاريخ الميلاد
                        </span>
                        <span className="font-semibold">
                          {booking.patientId?.dateOfBirth &&
                            formatDate(booking.patientId.dateOfBirth)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Diagnosis Report */}
                  <div className="pt-4 border-t">
                    <div className="text-sm font-bold text-gray-600 mb-2">
                      التشخيص الطبي
                    </div>
                    <div className="bg-white border border-yellow-100 rounded p-4 min-h-[80px]">
                      <p className="whitespace-pre-wrap text-gray-800 text-base">
                        {currentDiagnosisReport?.report || "لا يوجد تحليل متاح"}
                      </p>
                    </div>
                  </div>
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
                  disabled={!readyToComplete(booking)}
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
                  <Label htmlFor="diagnosis" className="block text-right mb-2">
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
                      onClick={() => handleCompleteBooking(booking._id)}
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
          {booking.status !== "cancelled" && booking.status !== "completed" && (
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
                    هل أنت متأكد من إلغاء هذا الحجز؟ يرجى إدخال سبب الإلغاء.
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
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="أدخل سبب الإلغاء..."
                    className="mb-4 text-right"
                  />
                  <div className="flex flex-row-reverse gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking._id)}
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
  );
}
