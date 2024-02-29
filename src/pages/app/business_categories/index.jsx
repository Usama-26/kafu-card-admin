import { Fragment, useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import Searchbar from "@/components/Searchbar";
import SimpleTable from "@/components/Tables/Simple";
import { useSelector } from "react-redux";
import {
  getAllCategories,
  getCategoriesPagination,
} from "@/features/categories/categoriesSlice";
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "@/features/categories/categoryApi";
import dayjs from "dayjs";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import SimpleNotification from "@/components/Notifications/Simple";
import AddCategoryModal from "@/components/Category/Add";
import EditCategoryModal from "@/components/Category/Edit";
import DeleteCategoryModal from "@/components/Category/Delete";
import Pagination from "@/components/Pagination";
const headers = ["Image", "Category Name", "Date", ""];

export default function BusinessCategories() {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [selected, setSelected] = useState("");
  const categories = useSelector(getAllCategories);
  const pagination = useSelector(getCategoriesPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex categorys-center justify-between">
          <h3>Business Categories</h3>
          <div className="flex gap-x-2">
            <button
              onClick={() => setOpenAddCategory(true)}
              type="button"
              className="btn-primary__with-icon"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Add Category</span>
            </button>
          </div>
        </div>
        <div className="my-4 flex justify-between categorys-center">
          <div>
            <Searchbar />
          </div>
        </div>
        <SimpleTable headers={headers}>
          {categories.length > 0
            ? categories.map((category, index) => (
                <tr
                  key={category.id}
                  className={`${
                    index % 2 === 0 ? undefined : "bg-gray-50"
                  } text-center`}
                >
                  <td className="whitespace-nowrap p-3 text-sm text-left">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    <Image
                      src={category.img}
                      width={400}
                      height={400}
                      className="w-20 h-12 object-contain mx-auto"
                      alt={category.title}
                    />
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {category.title}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {dayjs(category.createdAt).format("MM/DD/YYYY")}
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
                            <button
                              type="button"
                              onClick={() => {
                                setSelected(category.id);
                                setOpenEditCategory(true);
                              }}
                              className="w-full text-left flex gap-x-2 items-center px-4 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                            >
                              <EyeIcon className="w-4 h-4" />
                              <span>View</span>
                            </button>
                          </Menu.Item>
                          <Menu.Item as={"li"} className="p-0 ">
                            <button
                              type="button"
                              onClick={() => {
                                setSelected(category.id);
                                setOpenDeleteCategory(true);
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
        <Pagination
          currentPage={pagination.pageNo}
          handleClick={setPageNumber}
          totalPages={pagination.totalPages}
        />
        <AddCategoryModal
          show={openAddCategory}
          setShow={setOpenAddCategory}
          setMessage={setSuccessMessage}
        />
        {selected && (
          <EditCategoryModal
            categoryId={selected}
            show={openEditCategory}
            setShow={setOpenEditCategory}
          />
        )}
        {selected && (
          <DeleteCategoryModal
            categoryId={selected}
            show={openDeleteCategory}
            setShow={setOpenDeleteCategory}
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
