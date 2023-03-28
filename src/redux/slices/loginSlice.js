// import create-Slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk
export const userLogin = createAsyncThunk(
  "user/login",
  async (userCredentials, { rejectWithValue }) => {
    console.log(userCredentials);
    try {
      let res = await axios.post(
        " http://localhost:4000/user-api/user/login",
        userCredentials
      );

      // if the res has token
      if (res.data.payload) {
        // set the token to sessionStorage
        sessionStorage.setItem("token", res.data.payload);
        return res.data;
      } else {
        
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.log("error in slice for network error", err);
      return rejectWithValue(err.message);
    }
  }
);

// create slice for user login
const loginSlice = createSlice({
  name: "login",
  initialState: {
    userObj: {},
    errorMessage: "",
    status: "idle",
  },
  // reducers
  reducers: {
    clearState: (state) => {
      state.userObj = {};
      state.errorMessage = "";
      state.status = "idle";
    },
  },
  // extra reducers
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(action);
      state.userObj = action.payload.user;
      state.errorMessage = "";
      state.status = "success";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log("action in failed", action);

      state.errorMessage = action.payload;

      state.status = "failed";
    });
  },
});

// export action creators
export const { clearState } = loginSlice.actions;

// export reducer
export default loginSlice.reducer;
