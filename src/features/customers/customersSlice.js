import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCustomers } from "./customerApi";

const initialState = {
  customers: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const customersSlice = createSlice({
  name: "customer",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.customers = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default customersSlice.reducer;

export const getAllCustomers = (state) => {
  return state.customers.customers;
};
export const getCustomersPagination = (state) => {
  return {
    totalPages: state.customers.totalPages,
    totalResults: state.customers.totalResults,
    pageNo: state.customers.pageNo,
  };
};
export const getCustomersLoading = (state) => {
  return state.customers.isLoading;
};

export const getCustomersError = (state) => {
  return state.customers.error;
};
