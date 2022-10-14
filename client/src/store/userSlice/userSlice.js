import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../api/userApi";

export const fetchUserById = createAsyncThunk(
  "counter/fetchUserById",
  async (userId) => {
    const response = await UserApi.fetchById(userId);
    return response.data;
  }
);

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
