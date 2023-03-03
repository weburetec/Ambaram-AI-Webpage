import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// SIGNUP USERS
export const signUp = createAsyncThunk(
  "user/signUp",
  async ({values,navigate}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5000/user/signup`,values,{
        withCredentials: true,
      });
      if(response.data.token){
        navigate("/login")
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// SIGNIN USERS
export const signIn = createAsyncThunk(
  "user/signIn",
  async ({values,navigate}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5000/user/signin`,values,{
        withCredentials: true
      });
      if(response.data.token){
        navigate("/")
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// SIGNOUT USERS
export const signOut = createAsyncThunk(
  "user/signOut",
  async (navigate, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5000/user/signout`,navigate,{
        withCredentials: true,
      });
      navigate("/login")
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);