// import create-Slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

        // set the userObj to localstorage
        localStorage.setItem("userObj", JSON.stringify(res.data.user));
        localStorage.setItem("status", "success");
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

// logic for initializing the userObj with data from local storage beacuse of refreshing issue
let user = localStorage.getItem("userObj");

if (!user) {
  user = {};
} else {
  user = JSON.parse(user);
}

// status from localstorage
let status = localStorage.getItem("status");
//if not exist in local storage set idle
if (!status) {
  status = "idle";
}

// create slice for user login
const loginSlice = createSlice({
  name: "login",
  initialState: {
    userObj: user,
    errorMessage: "",
    status: status,
  },
  // reducers
  reducers: {
    clearState: (state) => {
      state.userObj = {};
      state.errorMessage = "";
      state.status = status;
      localStorage.removeItem("userObj");
      localStorage.removeItem("status");
      sessionStorage.removeItem("token");
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
