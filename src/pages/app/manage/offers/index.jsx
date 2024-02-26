import { Fragment, useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
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
import { useSelector } from "react-redux";
import { getAllOffers, getOffersError } from "@/features/offers/offersSlice";
import { fetchAllOffers } from "@/features/offers/offerApi";
import dayjs from "dayjs";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import DeleteOfferModal from "@/components/Offer/Delete";
import SimpleNotification from "@/components/Notifications/Simple";

const headers = [
  "Offer Title",
  "Offer Category",
  "Duration",
  "Discount",
  "Expires on",
  "Status",
  "",
];
const tabs = [
  { label: "All", value: "", colorClass: "bg-transparent" },
  {
    label: "Active",
    value: "active",
    colorClass: "bg-green-100 text-green-600",
  },
  {
    label: "Pending",
    value: "pending",
    colorClass: "bg-yellow-100 text-yellow-600",
  },
  {
    label: "Approved",
    value: "approved",
    colorClass: "bg-green-100 text-green-600",
  },
  {
    label: "Declined",
    value: "declined",
    colorClass: "bg-red-100 text-red-600",
  },
];

export default function ManageOffers() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const offers = useSelector(getAllOffers);
  const offersError = useSelector(getOffersError);

  const filteredOffers = !selectedTab.value
    ? offers
    : offers.filter(
        (offer) => offer.promotionStatus?.toLowerCase() === selectedTab.value
      );

  useEffect(() => {
    dispatch(fetchAllOffers());
  }, [offers, dispatch]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex offers-center justify-between">
          <h3>Offers Management</h3>
          <div className="flex gap-x-2">
            <Link
              href={"offers/add"}
              type="button"
              className="btn-primary__with-icon"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Add Offer</span>
            </Link>
            <button type="button" className="btn-primary__with-icon">
              <ArrowDownTrayIcon className="w-6 h-6" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
        <div className="my-4 flex justify-between offers-center">
          <Tabs tabs={tabs} onSelect={setSelectedTab} />
          <div className="flex offers-center gap-x-3">
            {/* <button className="text-red-500">
              <TrashIcon className="w-6 h-6" />
            </button> */}
            <Searchbar />
            {/* <button className="rounded px-2 py-1 border">
              <span>Filters</span>
              <FunnelIcon className="w-6 h-6 inline-block" />
            </button> */}
          </div>
        </div>
        <SimpleTable headers={headers}>
          {filteredOffers?.length > 0
            ? filteredOffers.map((offer, index) => (
                <tr
                  key={offer.id}
                  className={`${
                    index % 2 === 0 ? undefined : "bg-gray-50"
                  } text-center`}
                >
                  <td className="whitespace-nowrap p-3 text-sm ">
                    {index + 1}
                  </td>

                  <td className="whitespace-nowrap p-3 text-sm">
                    {offer.title}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {offer.categoryName}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {offer.duration}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {offer.discount} %
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {dayjs(offer.expiryDate).format("MM/DD/YYYY")}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {tabs.map((tab) =>
                      offer.promotionStatus.toLowerCase() === tab.value ? (
                        <span
                          className={`${tab.colorClass} rounded-full px-4 py-1.5 inline-block capitalize`}
                          key={offer.promotionStatus}
                        >
                          {offer.promotionStatus}
                        </span>
                      ) : null
                    )}
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
                              href={`offers/offer/${offer.id}`}
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
                                setSelectedId(offer.id);
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
          <DeleteOfferModal
            offerId={selectedId}
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
