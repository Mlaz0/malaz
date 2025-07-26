"use client";

import { useGetAllPayments } from "@/hooks/Actions/payment/useCurdsPayment";
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
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Search,
  Filter,
} from "lucide-react";
import AdminPagination from "@/components/admin.components/AdminPagination";
import PaymentRow from "@/components/admin.components/PaymentRow";
import { useGetAllPatients } from "@/hooks/Actions/patients/useCrudsPatients";

export default function AdminPayments() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 50;

  const { data: paymentsRes } = useGetAllPayments(page, limit);
  const paymentsData = paymentsRes?.data?.data;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("ar-EG").format(amount);
  };

  if (!paymentsData) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>جاري تحميل بيانات المدفوعات...</p>
          </div>
        </div>
      </div>
    );
  }

  const { payments, totalCount, totalPages, currentPage } = paymentsData;

  // Filter payments based on status and search term
  const filteredPayments =
    payments?.filter((payment) => {
      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;
      const matchesSearch =
        payment.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment._id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    }) || [];

  // Calculate statistics
  const totalAmount =
    payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const succeededPayments =
    payments?.filter((p) => p.status === "succeeded") || [];
  const failedPayments = payments?.filter((p) => p.status === "failed") || [];
  const pendingPayments = payments?.filter((p) => p.status === "pending") || [];
  const succeededAmount = succeededPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة المدفوعات</h1>
          <p className="text-muted-foreground">
            عرض وإدارة جميع المعاملات المالية
          </p>
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي المدفوعات
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatAmount(totalAmount)} جنيه
            </div>
            <p className="text-xs text-muted-foreground">جميع المعاملات</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              المدفوعات الناجحة
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {succeededPayments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatAmount(succeededAmount)} جنيه
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              المدفوعات الفاشلة
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {failedPayments.length}
            </div>
            <p className="text-xs text-muted-foreground">معاملات فاشلة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingPayments.length}
            </div>
            <p className="text-xs text-muted-foreground">معاملات معلقة</p>
          </CardContent>
        </Card>
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
                  placeholder="البحث بمعرف المستخدم أو معرف الجلسة..."
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
                <SelectItem value="succeeded">ناجح</SelectItem>
                <SelectItem value="failed">فاشل</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            قائمة المدفوعات ({filteredPayments.length} من {totalCount})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم المستخدم</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <PaymentRow payment={payment} key={payment._id} />
              ))}
            </TableBody>
          </Table>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                لا توجد مدفوعات تطابق معايير البحث
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
