import Selectbox from "@/components/Selectbox";
import ToggleButton from "@/components/Switch";
import useOffer from "@/features/offers/useOffer";
import AppLayout from "@/layouts/AppLayout";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const categories = [
  { value: "fashion", label: "Fashion" },
  { value: "restaurant", label: "Restaurants" },
  { value: "food", label: "Food" },
];

const durations = [
  { value: "1-month", label: "1 Month" },
  { value: "3-months", label: "3 Months" },
  { value: "6-months", label: "6 Months" },
  { value: "1-year", label: "1 Year" },
];

export default function AddOffer() {
  const [edit, setEdit] = useState(false);

  const { getOffer, reset, isLoading, error, offer } = useOffer();
  const router = useRouter();
  const offerId = router?.query?.offerId;

  const toggleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (offerId) {
      getOffer(offerId);
    }
  }, [offerId]);

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
          >
            {({ errors }) => (
              <Form>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
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
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium"
                    >
                      Offer Category
                    </label>
                    <Field
                      name="category"
                      id="category"
                      as={SelectInput}
                      items={categories}
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
                  <div>
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
                  </div>
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
                    {edit && (
                      <div className="mt-auto ml-auto text-end md:text-base text-sm font-semibold">
                        <button
                          type="button"
                          onClick={toggleEdit}
                          className="px-8 py-2  rounded-lg mr-2 text-primary hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button className="px-8 py-2  rounded-lg text-white bg-primary hover:bg-primary-light">
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </AppLayout>
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
