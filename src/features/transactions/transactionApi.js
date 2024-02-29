import { getData, getOne } from "@/services/api/generics";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAllTransactions = createAsyncThunk(
  "transaction/fetchAll",
  async (pageNo = 1) => {
    try {
      const response = await getData(`${BASE_URL}/transactions?page=${pageNo}`);
      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const fetchTransactionDetails = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/transactions`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
