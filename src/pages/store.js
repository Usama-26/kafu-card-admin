import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import customersReducer from "@/features/customers/customersSlice";
import partnersReducer from "@/features/partners/partnersSlice";
import offersReducer from "@/features/offers/offersSlice";
import categoriesReducer from "@/features/categories/categoriesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    partners: partnersReducer,
    offers: offersReducer,
    categories: categoriesReducer,
  },
});
export default store;
