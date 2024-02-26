import { addMonths, addYears, format } from "date-fns";

const durationMap = {
  1: addMonths,
  3: addMonths,
  6: addMonths,
  12: addMonths,
};

const calculateExpiryDate = (selectedDuration) => {
  const currentDate = new Date();
  const interval = parseInt(selectedDuration.split(" ")[0], 10);
  const durationFunction = durationMap[interval];
  if (durationFunction) {
    const newExpiryDate = durationFunction(currentDate, interval);
    return newExpiryDate;
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export { classNames, calculateExpiryDate };
