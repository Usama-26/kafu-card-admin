import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import Selectbox from "@/components/Selectbox";
import ToggleButton from "@/components/Switch";
import { getAllCategories } from "@/features/categories/categoriesSlice";
import { fetchAllCategories } from "@/features/categories/categoryApi";
import { fetchAllOffers } from "@/features/offers/offerApi";
import useOffer from "@/features/offers/useOffer";
import { fetchAllPartners } from "@/features/partners/partnerApi";
import { getAllPartners } from "@/features/partners/partnersSlice";
import AppLayout from "@/layouts/AppLayout";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const durations = [
  { value: "1 Month", label: "1 Month" },
  { value: "3 Months", label: "3 Months" },
  { value: "6 Months", label: "6 Months" },
  { value: "1 Year", label: "1 Year" },
];

export default function AddOffer() {
  const { addOffer, reset, isLoading, successMessage, error } = useOffer();
  const categories = useSelector(getAllCategories);
  const partners = useSelector(getAllPartners);
  const dispatch = useDispatch();
  const router = useRouter();

  const categoriesList = categories?.map((category) => {
    return { value: category.title, label: category.title };
  });

  const partnersList = partners?.map((partner) => {
    return { value: partner.id, label: partner.bussinessName };
  });

  const handleAddOffer = (data) => {
    addOffer(data);
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllPartners());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        router.replace(".");
      }, 1000);
    }
  }, [dispatch, router, successMessage]);

  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Add Offer</h1>
        </div>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          <div className="flex justify-between mb-4">
            <h1 className="text-lg font-semibold">Offer Details</h1>
          </div>
          <Formik
            initialValues={{
              partner: { value: "", label: "" },
              title: "",
              discount: 0,
              categoryName: {
                value: "",
                label: "",
              },
              duration: {
                value: "",
                label: "",
              },
              description: "",
              isFeatured: false,
            }}
            onSubmit={(values) => {
              const data = {
                ...values,
                partner: values.partner.value,
                categoryName: values.categoryName.value,
                duration: values.duration.value,
              };
              handleAddOffer(data);
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
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-auto ml-auto text-end md:text-base text-sm font-semibold">
                  <button
                    type="submit"
                    className="px-8 py-2  rounded-lg text-white bg-primary hover:bg-primary-light"
                  >
                    {isLoading ? <Spinner /> : "Add Offer"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
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

function SelectInput({ name, value, items, disabled, onChange }) {
  const defaultIndex =
    items.findIndex((item) => item.value === value?.value) || 0;
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
