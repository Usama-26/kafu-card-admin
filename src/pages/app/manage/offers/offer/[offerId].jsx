import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
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
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const durations = [
  { value: "1 Month", label: "1 Month" },
  { value: "3 Months", label: "3 Months" },
  { value: "6 Months", label: "6 Months" },
  { value: "1 Year", label: "1 Year" },
];

export default function OfferDetails() {
  const [edit, setEdit] = useState(false);

  const [showApproveModal, setShowApproveModal] = useState(false);
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
    console.log(data);
    editOffer(offerId, data);
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

  console.log(error);

  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Offer #{offerId?.slice(-4)}</h1>
          {offer && offer.promotionStatus === "pending" && (
            <div className="text-end md:text-base text-sm font-semibold">
              <button
                type="button"
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
              <span> Edit</span>
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
                categoryName: {
                  value: offer?.categoryName || "",
                  label: offer?.categoryName || "",
                },
                duration: {
                  value: offer?.duration || "",
                  label: offer?.duration || "",
                },
                description: offer?.description || "",
                isFeatured: offer?.isFeatured || false,
              }}
              onSubmit={(values) => {
                const data = {
                  ...values,
                  partner: values.partner.value,
                  categoryName: values.categoryName.value,
                  duration: values.duration.value,
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
                        disabled={!edit}
                        className="number-field"
                      />
                    </div>
                    {/* <div>
                      <label
                        htmlFor="validity"
                        className="block mb-2 text-sm font-medium"
                      >
                        Products offer validity
                      </label>
                      <Field
                        name="validity"
                        id="validity"
                        type="text"
                        disabled={!edit}
                        className="text-field"
                      />
                    </div> */}
                    {/* <div>
                      <label
                        htmlFor="location"
                        className="block mb-2 text-sm font-medium"
                      >
                        Location
                      </label>
                      <Field
                        name="location"
                        id="location"
                        type="text"
                        disabled={!edit}
                        className="text-field"
                      />
                    </div> */}
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
                        disabled={!edit}
                        items={durations}
                      />
                    </div>
                    <div>
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
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <label
                          htmlFor="isFeatured"
                          className="block mb-2 text-sm font-medium"
                        >
                          Featured Offer
                        </label>
                        <Field
                          name="isFeatured"
                          id="isFeatured"
                          as={FeaturedToggle}
                          disabled={!edit}
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
          ) : null}
        </div>
      </section>
      {offer && offer.promotionStatus === "pending" && (
        <ApproveModal
          offerId={offerId}
          show={showApproveModal}
          setShow={setShowApproveModal}
        />
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
  const { approveOffer, successMessage, isLoading, error } = useOffer();

  const handleApprove = (amount) => {
    approveOffer({ promotionId: offerId, amount: amount });
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
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

function FeaturedToggle({ value, disabled, name, onChange }) {
  return (
    <ToggleButton
      value={value}
      disabled={disabled}
      onToggle={(value) => onChange({ target: { name: name, value: value } })}
    />
  );
}
