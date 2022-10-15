import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchRequestAll = createAsyncThunk(
  "request/addRequestAll",
  async (data) => {
    return RequestApi.fetchRequestAll(data);
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
    builder
      .addCase(fetchRequestByClientId.fulfilled, (state, action) => {
        state.requests = action.payload;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.requests.push(action.payload);
      });
  },
});

export const { resetUser } = requestSlice.actions;

export default requestSlice.reducer;
