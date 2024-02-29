import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import useCustomer from "@/features/customers/useCustomer";
import AppLayout from "@/layouts/AppLayout";
import { convertImageToBase64, uploadImage } from "@/utils/imageUpload";
import {
  CameraIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import Image from "next/image";
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
            Customer #{customer && customer?.id}
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
                photoUrl: customer?.photoUrl || "",
                nationality: customer?.nationality || "",
                country: customer?.country || "",
                membership: {
                  id: customer?.membership?.id || "",
                  expiryDate:
                    customer?.membership?.expiryDate &&
                    dayjs(customer?.membership?.expiryDate).format(
                      "MM/DD/YYYY"
                    ),
                },
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("First Name is required"),
                lastName: Yup.string().required("Last Name is required"),
                phoneNo: Yup.string().required("Phone No is required"),
              })}
              onSubmit={(values) => {
                handleEditCustomer({
                  ...values,
                  email: undefined,
                  membership: undefined,
                });
              }}
            >
              {({ values }) => (
                <Form>
                  <div className="text-center mb-10">
                    <CustomerImage edit={edit} />
                  </div>
                  <div>
                    <h3 className="pb-4">Personal Details</h3>
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
                          disabled={true}
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
                      <div>
                        <label
                          htmlFor="country"
                          className="block mb-2 text-sm font-medium"
                        >
                          Country
                        </label>
                        <Field
                          name="country"
                          id="country"
                          type="text"
                          disabled={!edit}
                          required
                          className="text-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="country"
                          className="text-sm text-red-700"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="nationality"
                          className="block mb-2 text-sm font-medium"
                        >
                          Nationality
                        </label>
                        <Field
                          name="nationality"
                          id="nationality"
                          type="text"
                          disabled={!edit}
                          required
                          className="text-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="nationality"
                          className="text-sm text-red-700"
                        />
                      </div>
                    </div>
                  </div>
                  {values.membership.id && (
                    <div>
                      <h3 className="py-4">Membership Details</h3>
                      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                        <div>
                          <label
                            htmlFor="membershipId"
                            className="block mb-2 text-sm font-medium"
                          >
                            Membership ID
                          </label>
                          <Field
                            name="membership.id"
                            id="membershipId"
                            type="text"
                            required
                            disabled={true}
                            className="text-field"
                          />
                          <ErrorMessage
                            component={"span"}
                            name="membership.id"
                            className="text-sm text-red-700"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="membership.expiryDate"
                            className="block mb-2 text-sm font-medium"
                          >
                            Expiry Date
                          </label>
                          <Field
                            name="membership.expiryDate"
                            id="membership.expiryDate"
                            type="text"
                            required
                            disabled={true}
                            className="text-field"
                          />
                          <ErrorMessage
                            component={"span"}
                            name="membership.id"
                            className="text-sm text-red-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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

function CustomerImage({ edit }) {
  const { values, setFieldValue } = useFormikContext();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    try {
      const result = await convertImageToBase64(file);
      const response = await uploadImage(result, () => {});
      setFieldValue("photoUrl", response.secure_url);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <span className="relative inline-block cursor-pointer mx-auto">
      <span className="inline-block rounded-full text-gray-700">
        {values.photoUrl ? (
          <Image
            src={values.photoUrl}
            height={600}
            width={600}
            alt="User Image"
            className="lg:w-40 lg:h-40 w-28 h-28 object-cover rounded-full"
          />
        ) : (
          <UserCircleIcon className="lg:w-40 lg:h-40 w-28 h-28 " />
        )}
      </span>
      {edit && (
        <label
          htmlFor="profile_photo"
          className={`inline-block cursor-pointer absolute lg:bottom-5 lg:right-5 bottom-3 right-3 rounded-full p-1.5 bg-primary hover:bg-primary-light text-white`}
        >
          <CameraIcon className="w-6 h-6 " />
        </label>
      )}
      <input
        disabled={!edit}
        type="file"
        name="photoUrl"
        id="profile_photo"
        className="hidden"
        onChange={handleChange}
      />
    </span>
  );
}
