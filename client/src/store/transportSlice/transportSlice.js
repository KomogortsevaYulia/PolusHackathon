import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TransportApi } from "../../api/transportApi";

export const fetchTransport = createAsyncThunk(
  "counter/fetchTransport",
  async (request) => {
    const response = await TransportApi.fetchTransport(request);
    return response;
  }
);

const initialState = {
  transport: null,
};

export const transportSlice = createSlice({
  name: "transport",
  initialState,
  reducers: {
    resetTransport: (state) => {
      state.transport = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransport.fulfilled, (state, action) => {
      state.transport = action.payload;
    });
  },
});

export default transportSlice.reducer;
