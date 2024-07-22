import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./index";
import profileReducer from "./profileSlice";
const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer,
    profile: profileReducer,
  },
});
export default store;
