import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Check, X, Calendar, Clock, User, Link } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { formatDate, formatTime } from "@/utils/formatOperations";
import {
  PreviewDetailsDialog,
  ShowDiagnosisDialog,
} from "@/components/doctor-dashboard/bookingDialoges";
import { useMeetingLink } from "@/hooks/Actions/booking/useMeetingLink";
import {
  useCancelBooking,
  useCompleteBooking,
} from "@/hooks/Actions/booking/useCurdsBooking";
import {
  useCreateDiagnosis,
  useGetDoctorDiagnosis,
} from "@/hooks/Actions/diagnosis/useDiagnosisCruds";
import {
  getStatusBadge,
  getPaymentStatusBadge,
  readyToComplete,
  readyToGetLink,
} from "@/utils/bookingUtils.jsx";
import Swal from "sweetalert2";

export const BookingRow = ({
  booking,
  selectedBooking,
  onShowBookingDetails,
}) => {
  const [localCancelReason, setLocalCancelReason] = useState("");
  const [localDiagnosis, setLocalDiagnosis] = useState("");
  const [diagnosisReportId, setDiagnosisReportId] = useState("");

  // Hooks moved to row component
  const { meetLink, isRequesting, getMeetingLink } = useMeetingLink(
    booking._id
  );
  const { mutate: mutateCancel } = useCancelBooking();
  const { mutate: mutateComplete } = useCompleteBooking();
  const { mutate: mutateCreateDiagnosis } = useCreateDiagnosis();
  const { data: diagnosisReportRes } = useGetDoctorDiagnosis(diagnosisReportId);
  const diagnosisReport = diagnosisReportRes?.data?.data?.reports[0];

  const handleCancelBooking = () => {
    mutateCancel(
      {
        data: { status: "cancelled", cancelReason: localCancelReason },
        id: `/${booking._id}/cancel`,
      },
      {
        onSuccess: () => {
          Swal.fire("تم الإلغاء!", "تم إلغاء الحجز بنجاح.", "success");
          setLocalCancelReason("");
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

  const handleCompleteBooking = () => {
    mutateComplete(
      {
        data: { diagnosis: localDiagnosis },
        id: `/${booking._id}/complete`,
      },
      {
        onSuccess: () => {
          Swal.fire("تم الاكتمال", "تم اكمال الجلسة بنجاح.", "success");
          setLocalDiagnosis("");
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

  const handleCreateDiagnosis = () => {
    mutateCreateDiagnosis({ id: booking._id, data: {} });
  };

  const handleShowDiagnosis = () => {
    setDiagnosisReportId(booking._id);
  };

  const handleGetMeetingLink = () => {
    getMeetingLink();
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
        <div className="flex items-center gap-1">{booking.price} جنيه</div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {/* Preview Dialog */}
          <PreviewDetailsDialog
            booking={booking}
            selectedBooking={selectedBooking}
            showBookingDetails={onShowBookingDetails}
            getStatusBadge={getStatusBadge}
          />

          {/* Analysis Button - only show for completed bookings */}
          {booking.status === "completed" && !booking.isDiagnosed && (
            <Button
              className="bg-yellow-600 hover:bg-yellow-700"
              onClick={handleCreateDiagnosis}
            >
              انشاء تحليل
            </Button>
          )}

          {/*Show Diagnosis Button - only show for completed & diagnosed bookings */}
          {booking.status === "completed" && booking.isDiagnosed && (
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
                  onClick={handleGetMeetingLink}
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
                  {isRequesting ? (
                    <span className="text-gray-500">جاري تحميل الرابط...</span>
                  ) : meetLink ? (
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
                  <Label htmlFor="diagnosis" className="block text-right mb-2">
                    التشخيص
                  </Label>
                  <Textarea
                    id="diagnosis"
                    value={localDiagnosis}
                    onChange={(e) => setLocalDiagnosis(e.target.value)}
                    placeholder="أدخل التشخيص..."
                    className="mb-4 text-right min-h-[100px]"
                    rows={4}
                  />
                  <div className="flex flex-row-reverse gap-2">
                    <Button
                      variant="default"
                      onClick={handleCompleteBooking}
                      disabled={!localDiagnosis.trim()}
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
                    value={localCancelReason}
                    onChange={(e) => setLocalCancelReason(e.target.value)}
                    placeholder="أدخل سبب الإلغاء..."
                    className="mb-4 text-right"
                  />
                  <div className="flex flex-row-reverse gap-2">
                    <Button
                      variant="destructive"
                      onClick={handleCancelBooking}
                      disabled={!localCancelReason.trim()}
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
};
