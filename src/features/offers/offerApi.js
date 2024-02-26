import {
  deleteData,
  getData,
  getOne,
  postData,
  updateData,
} from "@/services/api/generics";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAllOffers = createAsyncThunk("offer/fetchAll", async () => {
  try {
    const response = await getData(`${BASE_URL}/promotions`);
    return response.data;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
});

export const createOffer = async (data) => {
  try {
    const response = await postData(`${BASE_URL}/promotions`, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const createOfferInvoice = async (data) => {
  try {
    const response = await postData(
      `${BASE_URL}/promotions/create-invoice`,
      data
    );
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchOffer = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/promotions`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updateOffer = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/promotions`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const deleteOffer = async (id, data) => {
  try {
    const response = await deleteData(`${BASE_URL}/promotions`, id, data);
    console.log(response.data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
