import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import usePartner from "@/features/partners/usePartner";
import AppLayout from "@/layouts/AppLayout";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
export default function EditPartner() {
  const router = useRouter();
  const partnerId = router?.query?.partnerId || "";
  const [edit, setEdit] = useState(false);

  const { editPartner, getPartner, partner, successMessage, isLoading, error } =
    usePartner();

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleEditPartner = (data) => {
    editPartner(partnerId, data);
  };

  useEffect(() => {
    if (partnerId) {
      getPartner(partnerId);
    }
  }, [partnerId]);

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
            Partner #{partner && partner?.id}
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
          {partner && (
            <Formik
              initialValues={{
                bussinessName: partner?.bussinessName || "",
                firstName: partner?.firstName || "",
                lastName: partner?.lastName || "",
                phoneNo: partner?.phoneNo || "",
                email: partner?.email || "",
                nationality: partner?.nationality || "",
                country: partner?.country || "",
                tradeLicense: partner?.tradeLicense || "",
              }}
              validationSchema={Yup.object({
                bussinessName: Yup.string().required(
                  "Business Name is required"
                ),
                firstName: Yup.string().required("First Name is required"),
                lastName: Yup.string().required("Last Name is required"),
                phoneNo: Yup.string().required("Phone No is required"),
                email: Yup.string().email().required("Email is required"),
              })}
              onSubmit={(values) => {
                handleEditPartner({ ...values, email: undefined });
              }}
            >
              {({}) => (
                <Form>
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
                      {/* <div>
                      <label
                        htmlFor="bussinessName"
                        className="block mb-2 text-sm font-medium"
                      >
                        Business Name
                      </label>
                      <Field
                        name="bussinessName"
                        id="bussinessName"
                        type="text"
                        required
                        disabled={!edit}
                        className="text-field"
                      />
                      <ErrorMessage
                        component={"span"}
                        name="businessName"
                        className="text-sm text-red-700"
                      />
                    </div> */}
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
                          required
                          disabled={true}
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
                          required
                          disabled={true}
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
                          htmlFor="nationality"
                          className="block mb-2 text-sm font-medium"
                        >
                          Nationality
                        </label>
                        <Field
                          name="nationality"
                          id="nationality"
                          type="text"
                          required
                          disabled={!edit}
                          className="text-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="nationality"
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
                          required
                          disabled={!edit}
                          className="text-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="country"
                          className="text-sm text-red-700"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="py-4">Personal Details</h3>

                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                      <div>
                        <label
                          htmlFor="bussinessName"
                          className="block mb-2 text-sm font-medium"
                        >
                          Business Name
                        </label>
                        <Field
                          name="bussinessName"
                          id="bussinessName"
                          type="text"
                          required
                          disabled={!edit}
                          className="text-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="businessName"
                          className="text-sm text-red-700"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="tradeLicense"
                          className="block mb-2 text-sm font-medium"
                        >
                          Trade License
                        </label>
                        <Field
                          name="tradeLicense"
                          id="tradeLicense"
                          type="text"
                          required
                          disabled={!edit}
                          className="number-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="phoneNo"
                          className="text-sm text-red-700"
                        />
                      </div>
                    </div>
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
      </section>
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
    </AppLayout>
  );
}
