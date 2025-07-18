import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useChargeWallet,
  useGetUserPayment,
} from "@/hooks/Actions/payment/useCurdsPayment";
import WalletHistoryTable from "@/components/layout/dashboard/user-dashboard/UserWalletPage/WalletHistoryTable";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function UserWalletPage() {
  const { data: userData } = useGetUserProfile();
  const { mutate } = useChargeWallet();

  const [depositAmount, setDepositAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isPending, isError } = useGetUserPayment(page, limit);

  const currentPage = data?.data?.data?.currentPage || 1;
  const totalPages = data?.data?.data?.totalPages || 1;
  const totalCount = data?.data?.data?.totalCount || 0;
  const payments = data?.data?.data?.payments || [];

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMsg("من فضلك أدخل مبلغ إيداع صالح.");
      return;
    }

    mutate(
      {
        data: {
          amount,
        },
      },
      {
        onSuccess: (data) => {
          window.location.href = data?.data?.data?.sessionUrl;
          setDepositAmount("");
        },
        onError: (error) => {
          setErrorMsg(error?.response?.data?.message);
        },
      }
    );
  };

  if (isError) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle>خطأ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive">{isError?.message}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center">محفظة المستخدم</h2>

        <Card className="shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              <span className="mx-1"> رصيد المحفظة</span>
              <span className="text-2xl font-bold">
                {userData?.data?.data?.walletBalance?.toFixed(2)} جنيه
              </span>
            </CardTitle>
          </CardHeader>
          {errorMsg && (
            <p className="text-destructive text-center">{errorMsg}</p>
          )}
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Input
              type="number"
              placeholder="أدخل مبلغ الإيداع"
              value={depositAmount}
              onChange={(e) =>
                setDepositAmount(e.target.value) || setErrorMsg("")
              }
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <Button
              onClick={handleDeposit}
              className="px-6 cursor-pointer py-2 rounded-md shadow-sm hover:shadow-md transition-all"
            >
              إيداع
            </Button>
          </CardContent>
        </Card>

        {/* جدول العمليات */}
        <Card className="shadow-md  rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold   ">
              سجل العمليات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WalletHistoryTable payments={payments} isPending={isPending} />
            <div className="mt-4 flex items-center justify-between">
              {payments?.length > 0 && (
                <>
                  <p className="text-sm text-gray-500">
                    {totalCount} عملية من {totalPages} صفحة
                  </p>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePagination(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={currentPage === i + 1}
                            onClick={() => handlePagination(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePagination(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
