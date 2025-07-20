import React from "react";
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
import { CheckCircle, Clock, Eye, XCircle } from "lucide-react";

export default function PaymentRow({ payment }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("ar-EG").format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      succeeded: {
        label: "نجح",
        variant: "default",
        icon: CheckCircle,
        className: "bg-green-100 text-green-800 hover:bg-green-100",
      },
      failed: {
        label: "فشل",
        variant: "destructive",
        icon: XCircle,
        className: "bg-red-100 text-red-800 hover:bg-red-100",
      },
      pending: {
        label: "في الانتظار",
        variant: "secondary",
        icon: Clock,
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      },
    };

    const config = statusConfig[status] || {
      label: status,
      variant: "outline",
      icon: Clock,
      className: "",
    };

    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };
  return (
    <TableRow key={payment._id}>
      <TableCell className="font-mono text-sm">
        {payment.userId.slice(-8)}...
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 font-semibold">
          {formatAmount(payment.amount)} جنيه
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(payment.status)}</TableCell>
      <TableCell>{formatDate(payment.createdAt)}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-right">تفاصيل المعاملة</DialogTitle>
              <DialogDescription className="text-right">
                معلومات مفصلة عن المعاملة المالية
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-sm">معرف المستخدم</label>
                  <p className="font-mono text-sm bg-muted p-2 rounded">
                    {payment.userId}
                  </p>
                </div>
                <div>
                  <label className="font-semibold text-sm">المبلغ</label>
                  <p className="text-lg font-bold">
                    {formatAmount(payment.amount)} جنيه
                  </p>
                </div>
                <div>
                  <label className="font-semibold text-sm">الحالة</label>
                  <div className="mt-1">{getStatusBadge(payment.status)}</div>
                </div>
                {/* <div>
                  <label className="font-semibold text-sm">
                    معرف جلسة Stripe
                  </label>
                  <p className="font-mono text-xs bg-muted p-2 rounded break-all">
                    {payment.sessionId}
                  </p>
                </div> */}
                <div>
                  <label className="font-semibold text-sm">تاريخ الإنشاء</label>
                  <p>{formatDate(payment.createdAt)}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
