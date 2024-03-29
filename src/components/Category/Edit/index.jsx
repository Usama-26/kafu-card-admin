import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import FileDropzone from "@/components/FileDropzone";
import Spinner from "@/components/Loaders/Spinner";
import ModalLayout from "@/components/Modals/Layout";
import { fetchAllCategories } from "@/features/categories/categoryApi";
import useCategory from "@/features/categories/useCategory";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export default function EditCategoryModal({ categoryId, show, setShow }) {
  const dispatch = useDispatch();
  const {
    editCategory,
    getCategory,
    reset,
    category,
    successMessage,
    error,
    isLoading,
  } = useCategory();

  const closeModal = () => {
    reset();
    dispatch(fetchAllCategories());
    setShow(false);
  };

  useEffect(() => {
    if (categoryId) {
      getCategory(categoryId);
    }
  }, [categoryId]);
  return (
    <ModalLayout isOpen={show} setIsOpen={closeModal}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Edit Business Category</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        {category ? (
          <Formik
            initialValues={{
              title: category.title,
              img: [
                {
                  secure_url: category.img,
                },
              ],
            }}
            validationSchema={Yup.object({
              title: Yup.string().required("Category title is required."),
              img: Yup.array().required("Category image is required."),
            })}
            onSubmit={(values) => {
              const { title, img } = values;
              editCategory(categoryId, {
                title: title,
                img: img[0].secure_url,
              });
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium"
                    >
                      Category Title
                    </label>
                    <Field
                      name="title"
                      id="title"
                      type="text"
                      className="text-field"
                    />
                    <ErrorMessage
                      component={"p"}
                      name="title"
                      className="text-sm text-red-700"
                    />
                  </div>
                  <div>
                    <span className="block mb-2 text-sm font-medium">
                      Category Image
                    </span>
                    {values.img.length === 0 ? (
                      <FileDropzone
                        setFiles={(img) => {
                          setFieldValue("img", img);
                        }}
                      />
                    ) : (
                      <div className=" relative">
                        <button
                          type="button"
                          onClick={() => setFieldValue("img", [])}
                          className="absolute top-0 right-0 m-1 p-1 z-10 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                        <Image
                          src={values.img[0].secure_url}
                          alt={`${values.title} Image`}
                          width={500}
                          height={300}
                          className=" h-72 mx-auto object-contain"
                        />
                      </div>
                    )}
                    <ErrorMessage
                      component={"p"}
                      name="img"
                      className="text-sm text-red-700"
                    />
                  </div>

                  <div className="mt-auto ml-auto text-end md:text-base text-xs font-medium">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-1  rounded-md mr-2 text-primary hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-1 rounded-md text-white bg-primary hover:bg-primary-light"
                    >
                      {isLoading ? <Spinner /> : "Update"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md py-4 animate-pulse bg-gray-300"></div>
            <div className="rounded-md h-72 animate-pulse bg-gray-300"></div>
          </div>
        )}
      </div>
    </ModalLayout>
  );
}
