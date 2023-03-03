import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// SIGNUP USERS
export const updatePrice = createAsyncThunk(
  "price/updatePrice",
  async ({obj,navigate}, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:5000/price/63f5c489f130d24050545c4a`,obj,{
        withCredentials: true
      });
      if(response.data.result){
        navigate('/')
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//GET ONE DATA
export const getOneData = createAsyncThunk(
    "price/getOneData",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:5000/price/${data}`,{
          withCredentials: true
        });
        return response.data.price;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );