import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import FileDropzoneMultiple from "@/components/FileDropzoneMultiple";
import Spinner from "@/components/Loaders/Spinner";
import ModalLayout from "@/components/Modals/Layout";
import SimpleNotification from "@/components/Notifications/Simple";
import Selectbox from "@/components/Selectbox";
import ToggleButton from "@/components/Switch";
import { getAllCategories } from "@/features/categories/categoriesSlice";
import { fetchAllCategories } from "@/features/categories/categoryApi";
import useOffer from "@/features/offers/useOffer";
import { fetchAllPartners } from "@/features/partners/partnerApi";
import { getAllPartners } from "@/features/partners/partnersSlice";
import AppLayout from "@/layouts/AppLayout";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Field, Form, Formik, useFormikContext } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const durations = [
  { value: "1 Month", label: "1 Month" },
  { value: "3 Months", label: "3 Months" },
  { value: "6 Months", label: "6 Months" },
  { value: "12 Months", label: "12 Months" },
];

export default function OfferDetails() {
  const [edit, setEdit] = useState(false);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const {
    getOffer,
    editOffer,
    reset,
    offer,
    isLoading,
    error,
    successMessage,
  } = useOffer();
  const categories = useSelector(getAllCategories);
  const partners = useSelector(getAllPartners);
  const dispatch = useDispatch();
  const router = useRouter();

  const offerId = router?.query?.offerId;

  const categoriesList = categories?.map((category) => {
    return { value: category.title, label: category.title };
  });

  const partnersList = partners?.map((partner) => {
    return { value: partner.id, label: partner.bussinessName };
  });

  const handleEditOffer = (data) => {
    editOffer(offerId, data);
    toggleEdit();
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllPartners());
  }, [dispatch]);

  useEffect(() => {
    if (offerId) {
      getOffer(offerId);
    }
  }, [offerId]);
  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Offer #{offerId?.slice(-4)}</h1>
          {offer && offer.promotionStatus === "pending" && (
            <div className="text-end md:text-base text-sm font-semibold">
              <button
                type="button"
                onClick={() => setShowRejectModal(true)}
                className="px-8 py-2 rounded-lg mr-2 border-primary border text-primary hover:bg-gray-100"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => setShowApproveModal(true)}
                className="px-8 py-2 rounded-lg text-white bg-primary hover:bg-primary-light"
              >
                Approve
              </button>
            </div>
          )}
        </div>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          <div className="flex justify-between mb-4">
            <h1 className="text-lg font-semibold">Offer Details</h1>
            <button
              type="button"
              onClick={toggleEdit}
              className="flex gap-x-2 items-center text-sm text-primary hover:text-primary-light"
            >
              <PencilSquareIcon className="w-5 h-5" />
              <span>Edit</span>
            </button>
          </div>

          {offer ? (
            <Formik
              initialValues={{
                partner: {
                  value: offer?.partner || "",
                  label: "",
                },
                title: offer.title || "",
                discount: offer?.discount || 0,
                description: offer?.description || "",
                isFeatured: offer?.isFeatured || false,
                images: offer?.images || [],
                categoryName: {
                  value: offer?.categoryName || "",
                  label: offer?.categoryName || "",
                },
                duration: {
                  value: offer?.duration || "",
                  label: offer?.duration || "",
                },
              }}
              onSubmit={(values) => {
                const data = {
                  ...values,
                  partner: values.partner.value,
                  categoryName: values.categoryName.value,
                };
                handleEditOffer(data);
              }}
            >
              {({}) => (
                <Form>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                    <div className="col-span-2">
                      <label
                        htmlFor="partner"
                        className="block mb-2 text-sm font-medium"
                      >
                        Partner
                      </label>
                      <Field
                        name="partner"
                        id="partner"
                        as={SelectInput}
                        disabled={!edit}
                        items={partnersList}
                        className="text-field"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium"
                      >
                        Offer Title
                      </label>
                      <Field
                        name="title"
                        id="title"
                        type="text"
                        disabled={!edit}
                        className="text-field"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="categoryName"
                        className="block mb-2 text-sm font-medium"
                      >
                        Offer Category
                      </label>
                      <Field
                        name="categoryName"
                        id="categoryName"
                        as={SelectInput}
                        disabled={!edit}
                        items={categoriesList}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="discount"
                        className="block mb-2 text-sm font-medium"
                      >
                        Discount %
                      </label>
                      <Field
                        name="discount"
                        id="discount"
                        type="number"
                        disabled={true}
                        className="number-field"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="duration"
                        className="block mb-2 text-sm font-medium"
                      >
                        Duration
                      </label>
                      <Field
                        name="duration"
                        id="duration"
                        as={SelectInput}
                        disabled={true}
                        items={durations}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium"
                      >
                        Offer Description
                      </label>
                      <Field
                        name="description"
                        id="description"
                        as="textarea"
                        rows="5"
                        disabled={!edit}
                        className="textarea-field"
                      />
                    </div>
                  </div>
                  <OfferImages disabled={!edit} />
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
          ) : null}
        </div>
      </section>
      {offer && offer.promotionStatus === "pending" && (
        <>
          <ApproveModal
            offerId={offerId}
            show={showApproveModal}
            setShow={setShowApproveModal}
          />
          <RejectionModal
            offerId={offerId}
            show={showRejectModal}
            setShow={setShowRejectModal}
          />
        </>
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
    </AppLayout>
  );
}

function ApproveModal({ offerId, show, setShow }) {
  const { approveOffer, getOffer, successMessage, isLoading, error } =
    useOffer();

  const handleApprove = (amount) => {
    approveOffer({ promotionId: offerId, amount: amount });
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        getOffer(offerId);
        setShow(false);
      }, 500);
    }
  }, [successMessage]);

  return (
    <ModalLayout isOpen={show} setIsOpen={setShow}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Approve Offer</h3>
          <button type="button" onClick={() => setShow(false)}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        <Formik
          initialValues={{ amount: "" }}
          onSubmit={(values) => {
            const { amount } = values;
            handleApprove(amount);
          }}
        >
          <Form>
            <div className="my-5">
              <div>
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium"
                >
                  Enter the bill
                </label>
                <Field
                  name="amount"
                  id="amount"
                  type="number"
                  className="text-field"
                />
              </div>
            </div>
            <div className=" text-center md:text-base text-sm font-semibold">
              <button
                type="button"
                onClick={() => setShow(false)}
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
                {isLoading ? <Spinner /> : "Approve"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </ModalLayout>
  );
}
function RejectionModal({ offerId, show, setShow }) {
  const { editOffer, getOffer, successMessage, isLoading, error } = useOffer();

  const handleReject = (rejectionReason) => {
    editOffer(offerId, {
      rejectionReason: rejectionReason,
      promotionStatus: "rejected",
    });
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        getOffer(offerId);
        setShow(false);
      }, 500);
    }
  }, [successMessage]);

  return (
    <ModalLayout isOpen={show} setIsOpen={setShow}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Reject Offer</h3>
          <button type="button" onClick={() => setShow(false)}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        <Formik
          initialValues={{ rejectionReason: "" }}
          onSubmit={(values) => {
            const { rejectionReason } = values;
            handleReject(rejectionReason);
          }}
        >
          <Form>
            <div className="my-5">
              <div>
                <label
                  htmlFor="rejectionReason"
                  className="block mb-2 text-sm font-medium"
                >
                  Reason for Rejection
                </label>
                <Field
                  name="rejectionReason"
                  id="rejectionReason"
                  as="textarea"
                  className="text-field"
                />
              </div>
            </div>
            <div className=" text-center md:text-base text-sm font-semibold">
              <button
                type="button"
                onClick={() => setShow(false)}
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
                {isLoading ? <Spinner /> : "Reject"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </ModalLayout>
  );
}

function SelectInput({ name, value, items, disabled, onChange }) {
  const defaultIndex = items.findIndex((item) => item.value === value?.value);
  return (
    <Selectbox
      defaultIndex={defaultIndex}
      items={items}
      disabled={disabled}
      onSelect={(selected) =>
        onChange({ target: { name: name, value: selected } })
      }
    />
  );
}

function OfferImages({ disabled }) {
  const { values, setFieldValue } = useFormikContext();

  const deleteImage = (index) => {
    const updatedImages = [...values.images];
    updatedImages.splice(index, 1);
    setFieldValue("images", updatedImages);
  };

  const handleChangeImages = (images) => {
    setFieldValue("images", images);
  };

  return (
    <div>
      {values.images.length > 0 && (
        <div className="mt-4">
          <h1 className="text-lg font-semibold">Offer Images</h1>
          <div className="flex flex-wrap gap-4">
            {values.images.map((image, index) => (
              <div key={index} className="group relative rounded-md">
                <Image
                  src={image}
                  height={400}
                  width={400}
                  className="rounded-md w-20 h-32 object-cover"
                  alt={`Image ${index}`}
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => deleteImage(index)}
                    className="group-hover:inline-block hidden absolute top-5 right-0 m-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {!disabled && (
            <FileDropzoneMultiple
              images={values.images}
              setImages={handleChangeImages}
            />
          )}
        </div>
      )}
    </div>
  );
}
