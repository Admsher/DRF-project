import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  password: "",
  company: "",
  companyPosition: "",
  contactNumber: "",
  email: "",
  companyDetails: "",
  companyDescription: "",
  imgSrc: "",
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      return { ...state, ...action.payload };
    },
    setImgSrc(state, action) {
      state.imgSrc = action.payload;
    },
  },
});
export const { setProfile, setImgSrc } = profileSlice.actions;
export default profileSlice.reducer;
