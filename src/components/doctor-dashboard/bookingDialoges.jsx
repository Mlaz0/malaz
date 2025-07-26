import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { formatDate, formatTime } from "@/utils/formatOperations";
import { Badge, Eye } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";

export const PreviewDetailsDialog = ({
  booking,
  selectedBooking,
  showBookingDetails,
  getStatusBadge,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => showBookingDetails(booking)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>تفاصيل الحجز</DialogTitle>
          <DialogDescription>معلومات مفصلة عن الحجز والمريض</DialogDescription>
        </DialogHeader>
        {selectedBooking && (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">اسم المريض</Label>
                <p>{selectedBooking.patientId.name}</p>
              </div>
              <div>
                <Label className="font-semibold">البريد الإلكتروني</Label>
                <p>{selectedBooking.patientId.email}</p>
              </div>
              <div>
                <Label className="font-semibold">الجنس</Label>
                <p>
                  {selectedBooking.patientId.gender === "male" ? "ذكر" : "أنثى"}
                </p>
              </div>
              <div>
                <Label className="font-semibold">تاريخ الميلاد</Label>
                <p>{formatDate(selectedBooking.patientId.dateOfBirth)}</p>
              </div>
              <div>
                <Label className="font-semibold">تاريخ الموعد</Label>
                <p>{formatDate(selectedBooking.appointmentDate)}</p>
              </div>
              <div>
                <Label className="font-semibold">وقت الموعد</Label>
                <p>
                  {formatTime(selectedBooking.startTime)} -{" "}
                  {formatTime(selectedBooking.endTime)}
                </p>
              </div>
              <div>
                <Label className="font-semibold">الحالة</Label>
                <p>{getStatusBadge(selectedBooking.status)}</p>
              </div>
              <div>
                <Label className="font-semibold">السعر</Label>
                <p>{selectedBooking.price} جنيه</p>
              </div>
            </div>
            {selectedBooking.cancelReason && (
              <div>
                <Label className="font-semibold">سبب الإلغاء</Label>
                <p>{selectedBooking.cancelReason}</p>
              </div>
            )}
            {selectedBooking.diagnosis && (
              <div>
                <Label className="font-semibold">التشخيص</Label>
                <p>{selectedBooking.diagnosis}</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const ShowDiagnosisDialog = ({
  booking,
  diagnosisReport,
  onShowDiagnosis,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-yellow-600 hover:bg-yellow-700"
          onClick={() => onShowDiagnosis(booking._id)}
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
                <span className="font-semibold">{booking.patientId?.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">البريد الإلكتروني</span>
                <span className="font-semibold">
                  {booking.patientId?.email}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">الجنس</span>
                <span className="font-semibold">
                  {booking.patientId?.gender === "male" ? "ذكر" : "أنثى"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">تاريخ الميلاد</span>
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
                {diagnosisReport?.report || "لا يوجد تحليل متاح"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
