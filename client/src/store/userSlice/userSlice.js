import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../api/userApi";

export const fetchUser = createAsyncThunk(
  "counter/fetchUser",
  async (user) => {
    const response = await UserApi.fetchUser(user);
    return response.data;
  }
);

export const fetchUserById = createAsyncThunk(
  "counter/fetchUserById",
  async (user) => {
    const response = await UserApi.fetchById(user);
    return response.data;
  }
);

const initialState = {
  user: {username:'Заказчик Игорь', role:1 },
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
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
