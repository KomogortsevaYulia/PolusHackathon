import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../api/userApi";

export const fetchUserById = createAsyncThunk(
  "counter/fetchUserById",
  async (user) => {
    const response = await UserApi.fetchById(user);
    return response;
  }
);

const initialState = {
  user: { id: 2, name: "Диспетчер Олег", role: { id: 2, name: "DISPATCHER" } },
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
