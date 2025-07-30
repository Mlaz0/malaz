import { Badge } from "@/components/ui/badge";

// Status badge configurations
const statusConfig = {
  pending: { label: "في الانتظار", variant: "secondary" },
  confirmed: { label: "مؤكد", variant: "default" },
  cancelled: { label: "ملغي", variant: "destructive" },
  completed: { label: "مكتمل", variant: "outline" },
};

const paymentStatusConfig = {
  paid: { label: "مدفوع", variant: "default" },
  pending: { label: "في الانتظار", variant: "secondary" },
  refunded: { label: "مسترد", variant: "outline" },
};

export const getStatusBadge = (status) => {
  const config = statusConfig[status] || {
    label: status,
    variant: "secondary",
  };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const getPaymentStatusBadge = (status) => {
  const config = paymentStatusConfig[status] || {
    label: status,
    variant: "secondary",
  };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

// Time validation helpers
export const readyToComplete = (booking) => {
  if (!booking?.endTime) return false;
  const end = new Date(booking?.endTime);
  return Date.now() + 3 * 60 * 60 * 1000 > end.getTime();
};

export const readyToGetLink = (booking) => {
  const start = new Date(booking?.startTime);
  const end = new Date(booking?.endTime);
  return (
    end.getTime() > Date.now() + 3 * 60 * 60 * 1000 &&
    Date.now() + 3 * 60 * 60 * 1000 > start.getTime() - 15 * 60 * 1000
  );
};
