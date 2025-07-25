import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentTableSkeleton } from "@/components/layout/dashboard/user-dashboard/UserWalletPage/payment-table-skeleton";
import { TableCell } from "@/components/ui/table";
import WalletHistoryRow from "./WalletHistoryRow";

const WalletHistoryTable = ({ payments, isPending }) => {
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table className="min-w-[800px] ">
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-[150px] text-center font-bold ">
              المبلغ
            </TableHead>
            <TableHead className="w-[150px] text-center font-bold ">
              الحالة
            </TableHead>
            <TableHead className="min-w-[200px] text-center font-bold ">
              التاريخ
            </TableHead>
            <TableHead className="min-w-[250px] text-center font-bold ">
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
            payments?.map((operation) => (
              <WalletHistoryRow key={operation._id} operation={operation} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WalletHistoryTable;
