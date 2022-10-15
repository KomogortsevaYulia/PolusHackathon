import { configureStore } from "@reduxjs/toolkit";
import requestSlice from "./requestSlice/requestSlice";
import transportSlice from "./transportSlice/transportSlice";

import userSlice from "./userSlice/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    transport: transportSlice,
    request: requestSlice,
  },
});
