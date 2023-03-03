import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getOneData, updatePrice } from "../Actions/priceAction";

const PriceReducer = createSlice({
  name: "user",
  initialState: {
    getPrice: [],
    loader: false,
    error: "",
    success: "",
  },

  extraReducers: {
    /* -------------------------- User Signup -------------------------- */
    [updatePrice.pending]: (state, action) => {
      state.loader = true;
    },
    [updatePrice.fulfilled]: (state, action) => {
      state.loader = false;
      toast.success(action.payload.message);
    },
    [updatePrice.rejected]: (state, action) => {
      state.loader = false;
      toast.error(action.payload.message);
    },

    /* -------------------------- User Signin -------------------------- */
    [getOneData.pending]: (state, action) => {
      state.loader = true;
    },
    [getOneData.fulfilled]: (state, action) => {
      state.loader = false;
      state.getPrice = action.payload;
      toast.success(action.payload.message);
    },
    [getOneData.rejected]: (state, action) => {
      state.loader = false;
      toast.error(action.payload.message);
    },
  },
});

// export default
export default PriceReducer.reducer;
