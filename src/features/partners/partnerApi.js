import {
  deleteData,
  getData,
  getOne,
  postData,
  updateData,
} from "@/services/api/generics";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAllPartners = createAsyncThunk(
  "partner/fetchAll",
  async (pageNo = 1) => {
    try {
      const response = await getData(`${BASE_URL}/partners?page=${pageNo}`);
      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const createPartner = async (data) => {
  console.log(data);
  try {
    const response = await postData(`${BASE_URL}/partners`, data);
    return response;
  } catch (error) {
    console.log(error);
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchPartner = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/partners`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updatePartner = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/partners`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const deletePartner = async (id, data) => {
  try {
    const response = await deleteData(`${BASE_URL}/partners`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
