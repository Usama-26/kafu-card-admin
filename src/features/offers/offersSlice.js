import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOffers } from "./offerApi";

const initialState = {
  offers: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const offersSlice = createSlice({
  name: "offer",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffers.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.offers = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default offersSlice.reducer;

export const getAllOffers = (state) => {
  return state.offers.offers;
};
export const getOffersPagination = (state) => {
  return {
    totalPages: state.offers.totalPages,
    totalResults: state.offers.totalResults,
    pageNo: state.offers.pageNo,
  };
};
export const getOffersLoading = (state) => {
  return state.offers.isLoading;
};

export const getOffersError = (state) => {
  return state.offers.error;
};
