import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../api/requestApi";

export const fetchRequestByUserId = createAsyncThunk(
  "counter/fetchRequestByUserId",
  async (request) => {
    const response = await UserApi.fetchRequestByUserId(request);
    return response;
  }
);

const initialState = {
  request: null,
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRequestByUserId.fulfilled, (state, action) => {
      state.request = action.payload;
    });
  },
});

export const { resetUser } = requestSlice.actions;

export default requestSlice.reducer;
