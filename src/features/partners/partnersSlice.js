import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPartners } from "./partnerApi";

const initialState = {
  partners: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const partnersSlice = createSlice({
  name: "partner",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPartners.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllPartners.fulfilled, (state, action) => {
        state.partners = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllPartners.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default partnersSlice.reducer;

export const getAllPartners = (state) => {
  return state.partners.partners;
};
export const getPartnersPagination = (state) => {
  return {
    totalPages: state.partners.totalPages,
    totalResults: state.partners.totalResults,
    pageNo: state.partners.pageNo,
  };
};
export const getPartnersLoading = (state) => {
  return state.partners.isLoading;
};

export const getPartnersError = (state) => {
  return state.partners.error;
};
