import { postData } from "@/services/api/generics";
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

export const getCurrentUser = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await postData(`${BASE_URL}/admin/getCurrentUser`, data);
    return response.data;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
});
