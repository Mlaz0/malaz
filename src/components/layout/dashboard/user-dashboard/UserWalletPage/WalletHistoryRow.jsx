import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatDate from "@/utils/formatDate";
import { useCancelPayment } from "@/hooks/Actions/payment/useCurdsPayment";
import endPoints from "@/config/endPoints";
import { useAuth } from "@/context/AuthContext";
import getRequest from "@/hooks/handleRequest/GetRequest";

const WalletHistoryRow = ({ operation }) => {
  const { mutate: cancelPayment } = useCancelPayment(
    `${endPoints.cancelSession}/${operation?.sessionId}`
  );

  const { token } = useAuth();

  const getDataRequest = async (sessionId) => {
    const { data } = await getRequest(
      `${endPoints.completeSession}/${sessionId}`,
      token
    );
    return data?.data;
  };

  const handleCompletePayment = async (sessionId) => {
    if (sessionId) {
      const data = await getDataRequest(sessionId);
      window.location.href = data?.sessionUrl;
    }
  };

  const handleCancelPayment = (sessionId) => {
    if (sessionId) {
      cancelPayment({});
    }
  };
  return (
    <TableRow className="hover:bg-gray-50/50">
      <TableCell className="text-center font-medium text-gray-900">
        {operation.amount.toFixed(2)} جنيه
      </TableCell>
      <TableCell>
        <Badge
          className={`mx-auto w-[120px] py-1.5 text-sm font-semibold
          ${
            operation.status === "pending"
              ? "bg-amber-50 text-amber-800 hover:bg-amber-50 border border-amber-200"
              : operation.status === "succeeded"
              ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-50 border border-emerald-200"
              : "bg-red-50 text-red-800 hover:bg-red-50 border border-red-200"
          }`}
        >
          {operation.status === "pending"
            ? "قيد الانتظار"
            : operation.status === "succeeded"
            ? "مكتمل"
            : "ملغي"}
        </Badge>
      </TableCell>
      <TableCell className="text-center text-gray-600">
        {formatDate(operation.createdAt)}
      </TableCell>
      <TableCell>
        {operation.status === "pending" && (
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCancelPayment(operation?.sessionId)}
              className="hover:bg-destructive cursor-pointer hover:text-white border-red-200 text-red-600"
            >
              إلغاء الدفع
            </Button>
            <Button
              onClick={() => handleCompletePayment(operation?.sessionId)}
              size="sm"
              className="bg-green-600 hover:bg-green-700 cursor-pointer text-white shadow-sm"
            >
              إتمام الدفع
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default WalletHistoryRow;
