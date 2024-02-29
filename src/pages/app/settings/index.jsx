import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import { getUser } from "@/features/auth/authSlice";
import useUser from "@/features/auth/useUser";
import AppLayout from "@/layouts/AppLayout";
import { convertImageToBase64, uploadImage } from "@/utils/imageUpload";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { CameraIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProfileSettings() {
  const user = useSelector(getUser);
  const [edit, setEdit] = useState(false);
  const { editAdmin, error, isLoading, successMessage } = useUser();

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleEditAdmin = (data) => {
    editAdmin(user.id, data);
  };

  useEffect(() => {
    if (successMessage) {
      toggleEdit();
    }
  }, [successMessage]);
  return (
    <AppLayout>
      <section className="">
        <div className="flex items-center justify-between">
          <h3>Settings</h3>
        </div>
        {user && (
          <div className="flex items-center justify-center">
            <Formik
              initialValues={{
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                email: user?.email || "",
                phoneNo: user?.phoneNo || "",
                photoUrl: user?.photoUrl || "",
              }}
              onSubmit={(values) => {
                handleEditAdmin({ ...values, email: undefined });
              }}
            >
              <Form className="max-w-xl w-full shadow-md bg-white rounded-lg p-4">
                <div>
                  <div className="rounded-lg h-40 bg-primary"></div>
                  <div className="text-center -translate-y-20">
                    <AdminImage edit={edit} />
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="pb-4">Account Details</h3>
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
                  <div>
                    <div className="space-y-6">
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
                          className="number-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="email"
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
                </div>
              </Form>
            </Formik>
          </div>
        )}
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

function AdminImage({ edit }) {
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
            className="w-28 h-28 object-cover rounded-full"
          />
        ) : (
          <UserCircleIcon className="w-28 h-28" />
        )}
      </span>
      {edit && (
        <label
          htmlFor="profile_photo"
          className={`inline-block cursor-pointer absolute bottom-7 right-0 rounded-full p-1.5 bg-primary hover:bg-primary-light text-white`}
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
