import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./index";
import profileReducer from "./profileSlice";
import candidateSlice from "./candidateSlice";
import modalSlice from "./modalSlice";
import selectionSlice from "./selectionSlice";
const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer,
    profile: profileReducer,
    candidate: candidateSlice.reducer,
    modal: modalSlice.reducer,
    selection: selectionSlice.reducer,
  },
});
export default store;
