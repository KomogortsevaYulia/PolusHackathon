import { configureStore } from "@reduxjs/toolkit";
import transportSlice from "./transportSlice/transportSlice";

import userSlice from "./userSlice/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    transport: transportSlice,
  },
});
