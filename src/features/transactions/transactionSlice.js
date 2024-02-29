import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTransactions } from "./transactionApi";

const initialState = {
  transactions: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const transactionsSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default transactionsSlice.reducer;

export const getAllTransactions = (state) => {
  return state.transactions.transactions;
};

export const getTransactionsPagination = (state) => {
  return {
    totalPages: state.transactions.totalPages,
    totalResults: state.transactions.totalResults,
    pageNo: state.transactions.pageNo,
  };
};
export const getTransactionsLoading = (state) => {
  return state.transactions.isLoading;
};

export const getTransactionsError = (state) => {
  return state.transactions.error;
};
