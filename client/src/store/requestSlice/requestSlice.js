import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../api/requestApi";
import { RequestApi } from "../../api/requestApi";


export const fetchRequestByUserId = createAsyncThunk(
  "request/fetchRequestByUserId",
  async (request) => {
    const response = await RequestApi.fetchRequestByUserId(request);
    return response;
  }
);

export const addRequest = createAsyncThunk(
  "request/addRequest",
  async (data) => {
    return RequestApi.addRequest(data);
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
