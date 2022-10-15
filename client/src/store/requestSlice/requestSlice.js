import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../api/requestApi";
import { RequestApi } from "../../api/requestApi";

export const fetchRequestByClientId = createAsyncThunk(
  "request/fetchRequestByClientId",
  async (id) => {
    const response = await RequestApi.fetchRequestByClientId(id);
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
  requests: null,
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
    builder.addCase(fetchRequestByClientId.fulfilled, (state, action) => {
      state.requests = action.payload;
    });
  },
});

export const { resetUser } = requestSlice.actions;

export default requestSlice.reducer;
