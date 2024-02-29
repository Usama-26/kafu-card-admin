import {
  deleteData,
  getData,
  getOne,
  postData,
  updateData,
} from "@/services/api/generics";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAllCustomers = createAsyncThunk(
  "customer/fetchAll",
  async (pageNo = 1) => {
    try {
      const response = await getData(`${BASE_URL}/customers?page=${pageNo}`);
      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const createCustomer = async (data) => {
  console.log(data);
  try {
    const response = await postData(`${BASE_URL}/customers`, data);
    return response;
  } catch (error) {
    console.log(error);
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchCustomer = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/customers`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updateCustomer = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/customers`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await deleteData(`${BASE_URL}/customers`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
