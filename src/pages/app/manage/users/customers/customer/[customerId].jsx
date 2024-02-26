import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import useCustomer from "@/features/customers/useCustomer";
import AppLayout from "@/layouts/AppLayout";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function EditCustomer() {
  const router = useRouter();
  const customerId = router?.query?.customerId || "";
  const {
    getCustomer,
    editCustomer,
    customer,
    successMessage,
    isLoading,
    error,
  } = useCustomer();
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleEditCustomer = (data) => {
    editCustomer(customerId, data);
  };

  useEffect(() => {
    if (customerId) {
      getCustomer(customerId);
    }
  }, [customerId]);

  useEffect(() => {
    if (successMessage) {
      toggleEdit();
    }
  }, [successMessage]);

  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Customer #{customer && customer?.id.slice(-4)}
          </h1>
          {!edit && (
            <button
              type="button"
              onClick={toggleEdit}
              className="flex gap-x-2 items-center text-sm text-primary hover:text-primary-light"
            >
              <PencilSquareIcon className="w-5 h-5" />
              <span> Edit</span>
            </button>
          )}
        </div>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          {customer && (
            <Formik
              initialValues={{
                firstName: customer?.firstName || "",
                lastName: customer?.lastName || "",
                phoneNo: customer?.phoneNo || "",
                email: customer?.email || "",
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("First Name is required"),
                lastName: Yup.string().required("Last Name is required"),
                phoneNo: Yup.string().required("Phone No is required"),
              })}
              onSubmit={(values) => {
                handleEditCustomer({ ...values, email: undefined });
              }}
            >
              {({}) => (
                <Form>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium"
                      >
                        First Name
                      </label>
                      <Field
                        name="firstName"
                        id="firstName"
                        type="text"
                        required
                        disabled={!edit}
                        className="text-field"
                      />
                      <ErrorMessage
                        component={"span"}
                        name="firstName"
                        className="text-sm text-red-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium"
                      >
                        Last Name
                      </label>
                      <Field
                        name="lastName"
                        id="lastName"
                        type="text"
                        required
                        disabled={!edit}
                        className="text-field"
                      />
                      <ErrorMessage
                        component={"span"}
                        name="lastName"
                        className="text-sm text-red-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phoneNo"
                        className="block mb-2 text-sm font-medium"
                      >
                        Phone
                      </label>
                      <Field
                        name="phoneNo"
                        id="phoneNo"
                        type="text"
                        disabled={!edit}
                        required
                        className="number-field"
                      />
                      <ErrorMessage
                        component={"span"}
                        name="phoneNo"
                        className="text-sm text-red-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        id="email"
                        type="text"
                        disabled={true}
                        required
                        className="text-field"
                      />
                      <ErrorMessage
                        component={"span"}
                        name="email"
                        className="text-sm text-red-700"
                      />
                    </div>
                    {/* <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium"
                      >
                        Password
                      </label>
                      <Field
                        name="password"
                        id="password"
                        type="password"
                        required
                        className="text-field"
                      />
                      <ErrorMessage
                        component={"span"}
                        name="password"
                        className="text-sm text-red-700"
                      />
                    </div> */}
                  </div>
                  {edit && (
                    <div className="my-4 text-end md:text-base text-sm font-semibold">
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={toggleEdit}
                        className="px-8 py-2  rounded-lg mr-2 text-primary hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-2  rounded-lg text-white bg-primary hover:bg-primary-light"
                      >
                        {isLoading ? <Spinner /> : "Edit & Save"}
                      </button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          )}
        </div>
        {successMessage && (
          <SimpleNotification
            type={"success"}
            heading={"Success"}
            message={successMessage}
            setMessage={() => {}}
          />
        )}
        {error && (
          <SimpleNotification
            type={"error"}
            heading={"Error"}
            message={error}
            setMessage={() => {}}
          />
        )}
      </section>
    </AppLayout>
  );
}
