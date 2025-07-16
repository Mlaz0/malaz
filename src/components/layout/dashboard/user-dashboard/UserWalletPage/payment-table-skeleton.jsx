import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function PaymentTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index} className="hover:bg-transparent">
          <TableCell className="px-6 py-4 whitespace-nowrap text-right">
            <Skeleton className="h-5 w-20 rounded-md" />
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap text-right">
            <Skeleton className="h-6 w-24 rounded-full" />
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap text-right">
            <Skeleton className="h-5 w-32 rounded-md" />
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap text-left">
            <div className="flex justify-start gap-3">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-32 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
