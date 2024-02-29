import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import useCustomer from "@/features/customers/useCustomer";
import AppLayout from "@/layouts/AppLayout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";
export default function AddCustomer() {
  const router = useRouter();
  const { addCustomer, reset, successMessage, isLoading, error } =
    useCustomer();

  const handleAddCustomer = (data) => {
    addCustomer(data);
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        reset();
        router.replace(".");
      }, 1000);
    }
  }, [successMessage, router, reset]);

  return (
    <AppLayout>
      <section>
        <h1 className="text-xl font-semibold">Add New Customer</h1>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phoneNo: "",
              email: "",
              password: "",
              nationality: "",
              country: "",
            }}
            validationSchema={Yup.object({
              lastName: Yup.string().required("Last Name is required"),
              phoneNo: Yup.string().required("Phone No is required"),
              email: Yup.string().email().required("Email is required"),
              firstName: Yup.string().required("First Name is required"),
              country: Yup.string().required("Country is required"),
              nationality: Yup.string().required("Nationality is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={(values) => {
              handleAddCustomer(values);
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
                  </div>
                </div>
                <div className="my-4 text-end md:text-base text-sm font-semibold">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="px-8 py-2  rounded-lg mr-2 text-primary hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-2  rounded-lg text-white bg-primary hover:bg-primary-light"
                  >
                    {isLoading ? <Spinner /> : "Add"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
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
