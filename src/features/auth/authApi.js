import { getData, postData, updateData } from "@/services/api/generics";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await postData(`${BASE_URL}/admin/login`, data);
    localStorage.setItem("accessToken", response.data?.token?.access?.token);
    return response.data;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
});

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    if (!localStorage.getItem("accessToken")) return;
    try {
      const response = await getData(`${BASE_URL}/admin`);
      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const updateAdmin = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/admin`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
