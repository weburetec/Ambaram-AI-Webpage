import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { signIn, signOut, signUp } from "../Actions/userAction";

const UserReducer = createSlice({
  name: "user",
  initialState: {
    loader: false,
    error: "",
    success: "",
  },

  extraReducers: {
    /* -------------------------- User Signup -------------------------- */
    [signUp.pending]: (state, action) => {
      state.loader = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loader = false;
      toast.success(action.payload.message);
    },
    [signUp.rejected]: (state, action) => {
      state.loader = false;
      toast.error(action.payload.message);
    },

    /* -------------------------- User Signin -------------------------- */
    [signIn.pending]: (state, action) => {
      state.loader = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loader = false;
      toast.success(action.payload.message);
    },
    [signIn.rejected]: (state, action) => {
      state.loader = false;
      toast.error(action.payload.message);
    },

 /* -------------------------- User SignOut -------------------------- */
    [signOut.pending]: (state, action) => {
     state.loader = true;
    },
    [signOut.fulfilled]: (state, action) => {
     state.loader = false;
    },
    [signOut.rejected]: (state, action) => {
      state.loader = false;
      toast.error(action.payload.message);
    },
  },
});

// export default
export default UserReducer.reducer;
