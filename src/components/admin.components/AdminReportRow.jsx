import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/formatOperations";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { useUpdateReportStatus } from "@/hooks/Actions/reports/useReportCruds";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function AdminReportRow({ report }) {
  const { mutate } = useUpdateReportStatus();

  const handleReview = () => {
    mutate({ data: { isReviewed: true }, id: report._id });
  };

  return (
    <TableRow>
      <TableCell>{report.patient.name || "-"}</TableCell>
      <TableCell>{report.doctor.name || "-"}</TableCell>
      <TableCell>{report.doctor?.email}</TableCell>
      <TableCell>{formatDate(new Date(report.createdAt))}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mx-2">
              <Eye />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg w-full p-6 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold mb-2">
                عرض البلاغ
              </DialogTitle>
              <DialogDescription className="mb-4 text-sm text-muted-foreground">
                تفاصيل البلاغ المقدم من المريض ضد الطبيب
              </DialogDescription>
            </DialogHeader>
            <div className="mb-4 space-y-4">
              <div className="flex flex-col md:flex-row md:gap-8 gap-4 bg-gray-50 rounded-md p-4 border">
                <div className="flex-1">
                  <div className="font-semibold text-gray-700 mb-1">المريض</div>
                  <div className="text-base font-medium">
                    {report.patient?.name || "-"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {report.patient?.email || "-"}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-700 mb-1">الطبيب</div>
                  <div className="text-base font-medium">
                    {report.doctor?.name || "-"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {report.doctor?.email || "-"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold">تاريخ البلاغ:</span>
                {formatDate(new Date(report.createdAt))}
              </div>
            </div>
            <hr className="my-4 border-gray-200" />
            <div>
              <div className="font-semibold mb-2 text-gray-700">نص البلاغ:</div>
              <div
                className="bg-gray-100 rounded-lg p-4 shadow-inner text-[15px] text-gray-900 max-h-64 overflow-y-auto whitespace-pre-wrap break-words font-sans"
                style={{ fontFamily: "inherit" }}
              >
                {report?.report || "لا توجد رسالة"}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {report?.isReviewed ? (
          <span className="inline-flex items-center text-green-600 font-semibold">
            <svg
              className="w-4 h-4 mr-1 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            تمت المراجعة
          </span>
        ) : (
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleReview}
          >
            تحديد كمُراجع
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default AdminReportRow;
