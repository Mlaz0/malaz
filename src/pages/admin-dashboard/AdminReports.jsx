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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, AlertTriangle } from "lucide-react";
import AdminPagination from "@/components/admin.components/AdminPagination";
import { useGetAllReports } from "@/hooks/Actions/reports/useReportCruds";
import AdminReportRow from "@/components/admin.components/AdminReportRow";
// import ReportRow from "@/components/admin.components/ReportRow"; // If you want to use a row component

export default function AdminReports() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data: reportsRes } = useGetAllReports(page, limit);
  const reportsData = reportsRes?.data?.data;

  if (!reportsData) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>جاري تحميل بيانات البلاغات...</p>
          </div>
        </div>
      </div>
    );
  }

  const { reports, total, totalPages, currentPage } = reportsData;

  // Filter reports based on status and search term
  const filteredReports =
    reports?.filter((report) => {
      const matchesStatus =
        statusFilter === "all" || report?.isReviewed === statusFilter;
      const matchesSearch =
        report.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctor?.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    }) || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة البلاغات</h1>
          <p className="text-muted-foreground">
            عرض وإدارة جميع البلاغات المقدمة من المستخدمين
          </p>
        </div>
      </div>
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            البحث والتصفية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث باسم المستخدم أو معرف البلاغ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="تصفية حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value={false}>قيد المراجعة</SelectItem>
                <SelectItem value={true}>تم المراجعة</SelectItem>
                {/* <SelectItem value="rejected">مرفوض</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            قائمة البلاغات ({filteredReports.length} من {total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم المستخدم</TableHead>
                <TableHead className="text-right">اسم الطبيب</TableHead>
                <TableHead className="text-right">بريد الطبيب</TableHead>
                <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <AdminReportRow key={report._id} report={report} />
              ))}
            </TableBody>
          </Table>

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                لا توجد بلاغات تطابق معايير البحث
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
