import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOptions: [],
  hasSelected: false,
};

const selectionSlice = createSlice({
  name: "selection",
  initialState: initialState,
  reducers: {
    select: (state, action) => {
      const option = action.payload;
      state.selectedOptions.push(option);
      state.hasSelected = true;
    },
  },
});
export const { select } = selectionSlice.actions;
export default selectionSlice;
