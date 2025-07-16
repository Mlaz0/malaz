import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentTableSkeleton } from "@/components/layout/dashboard/user-dashboard/UserWalletPage/payment-table-skeleton";
import WalletHistoryRow from "./WalletHistoryRow";

const WalletHistoryTable = ({ payments, isPending }) => {
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table className="min-w-[800px]">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[150px] text-center font-bold text-gray-700">
              المبلغ
            </TableHead>
            <TableHead className="w-[150px] text-center font-bold text-gray-700">
              الحالة
            </TableHead>
            <TableHead className="min-w-[200px] text-center font-bold text-gray-700">
              التاريخ
            </TableHead>
            <TableHead className="min-w-[250px] text-center font-bold text-gray-700">
              الإجراءات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <PaymentTableSkeleton />
          ) : payments?.payments?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-gray-500 text-lg"
              >
                لا توجد عمليات دفع مسجلة
              </TableCell>
            </TableRow>
          ) : (
            payments?.payments?.map((operation) => (
              <WalletHistoryRow key={operation._id} operation={operation} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WalletHistoryTable;
