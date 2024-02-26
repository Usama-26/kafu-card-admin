import { Fragment, useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import {
  ArrowDownTrayIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import Searchbar from "@/components/Searchbar";
import { FunnelIcon } from "@heroicons/react/24/outline";
import SimpleTable from "@/components/Tables/Simple";
import { useDispatch } from "react-redux";
import { fetchAllCustomers } from "@/features/customers/customerApi";
import { useSelector } from "react-redux";
import { getAllCustomers } from "@/features/customers/customersSlice";
import dayjs from "dayjs";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import DeleteCustomerModal from "@/components/Customer/Delete";
import SimpleNotification from "@/components/Notifications/Simple";

const headers = [
  "First Name",
  "Last Name",
  " Email",
  "Phone",
  "Date",
  "Status",
  "",
];

export default function ManageCustomers() {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const customers = useSelector(getAllCustomers);

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex items-center justify-between">
          <h3>Customers Management</h3>
          <div className="flex gap-x-2">
            <Link href="customers/add" className="btn-primary__with-icon">
              <PlusIcon className="w-6 h-6" />
              <span>Add Customer</span>
            </Link>
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
          {customers?.length > 0
            ? customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`${
                    index % 2 === 0 ? undefined : "bg-gray-50"
                  } text-center`}
                >
                  <td className="whitespace-nowrap p-3 text-sm ">
                    {index + 1}
                  </td>

                  <td className="whitespace-nowrap p-3 text-sm">
                    {customer.firstName}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {customer.lastName}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {customer.email}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {customer.phoneNo}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {dayjs(customer.createdAt).format("MM/DD/YYYY")}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {customer.membership ? "Member" : "Not a Member"}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    <Menu as="div" className="relative">
                      <Menu.Button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          as="ul"
                          className="p-1 px-2 m-0 w-28 origin-top-right bg-white absolute right-5 text-xs rounded-md shadow-custom-md shadow-gray-300"
                        >
                          <Menu.Item as={"li"} className="p-0 ">
                            <Link
                              href={`customers/customer/${customer.id}`}
                              className="flex gap-x-2 items-center px-4 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                            >
                              <EyeIcon className="w-4 h-4" />
                              <span>View</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item as={"li"} className="p-0 ">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenDelete(true);
                                setSelectedId(customer.id);
                              }}
                              className="w-full flex gap-x-2 items-center px-4 py-1.5 text-red-700 hover:text-red-800 hover:bg-red-100 rounded"
                            >
                              <TrashIcon className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))
            : null}
        </SimpleTable>
        {selectedId && (
          <DeleteCustomerModal
            customerId={selectedId}
            show={openDelete}
            setShow={setOpenDelete}
            setMessage={setSuccessMessage}
          />
        )}
        {successMessage && (
          <div className="mt-10">
            <SimpleNotification
              type={"success"}
              heading={"Success"}
              setMessage={setSuccessMessage}
              message={successMessage}
            />
          </div>
        )}
      </section>
    </AppLayout>
  );
}
