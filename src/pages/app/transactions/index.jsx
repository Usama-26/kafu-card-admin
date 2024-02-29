import AppLayout from "@/layouts/AppLayout";
import { ArrowDownTrayIcon, EyeIcon } from "@heroicons/react/20/solid";
import Searchbar from "@/components/Searchbar";
// import { FunnelIcon } from "@heroicons/react/24/outline";
import SimpleTable from "@/components/Tables/Simple";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  getAllTransactions,
  getTransactionsPagination,
} from "@/features/transactions/transactionSlice";
import { fetchAllTransactions } from "@/features/transactions/transactionApi";
import Pagination from "@/components/Pagination";

const headers = [
  "Transaction ID",
  "Customer ID",
  "Promotion",
  "Total Bill",
  "Discount Price",
  "Savings",
  "Date",
  "",
];
export default function Transactions() {
  const dispatch = useDispatch();
  const transactions = useSelector(getAllTransactions);
  const [pageNumber, setPageNumber] = useState(1);
  const pagination = useSelector(getTransactionsPagination);

  useEffect(() => {
    dispatch(fetchAllTransactions(pageNumber));
  }, [dispatch, pageNumber]);
  return (
    <AppLayout>
      <section className="">
        <div className="flex items-center justify-between">
          <h3>Transactions Management</h3>
          <div className="flex gap-x-2">
            <button type="button" className="btn-primary__with-icon">
              <ArrowDownTrayIcon className="w-6 h-6" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
        <div className="my-4 flex justify-between items-center">
          <div>
            <Searchbar />
          </div>
          {/* <div className="flex items-center gap-x-3">
            <button className="text-red-500">
              <TrashIcon className="w-6 h-6" />
            </button>
            <button className="rounded px-2 py-1 border">
              <span>Filters</span>
              <FunnelIcon className="w-6 h-6 inline-block" />
            </button>
          </div> */}
        </div>
        <SimpleTable headers={headers}>
          {transactions.length > 0
            ? transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`${
                    index % 2 === 0 ? undefined : "bg-gray-50"
                  } text-center`}
                >
                  <td className="whitespace-nowrap p-3 text-sm ">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {transaction.id?.slice(-4)}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {transaction.customer?.slice(-4)}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {transaction.promotionId?.title}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {transaction.totalBill}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {transaction.discountPrice}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {transaction.totalSavings}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {dayjs(transaction.date).format("MM/DD/YYYY")}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    <Link
                      href={`transactions/transaction/${transaction.id}`}
                      className="flex gap-x-2 items-center px-4 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))
            : null}
        </SimpleTable>
        <Pagination
          currentPage={pagination.pageNo}
          handleClick={setPageNumber}
          totalPages={pagination.totalPages}
        />
      </section>
    </AppLayout>
  );
}
