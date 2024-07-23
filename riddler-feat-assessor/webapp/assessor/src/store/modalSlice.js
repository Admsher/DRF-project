import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: {},
  content: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { id } = action.payload;
      state.isOpen[id] = id;
    },
    closeModal: (state, action) => {
      state.isOpen = {};
    },
  },
});
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice;
