import { createSlice } from "@reduxjs/toolkit";
const dummyNotification = [
  {
    message: "Some generated message from redux!",
    imgSrc: "",
    id: 1,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 2,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 3,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 4,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 5,
  },
  {
    message: "For search input example!",
    imgSrc: "",
    id: 6,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 7,
  },

  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 8,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 9,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 10,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 11,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 12,
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, necessitatibus!",
    imgSrc: "",
    id: 13,
  },
];

const notificationSlice = createSlice({
  name: "notification",
  initialState: dummyNotification,
  reducers: {},
});

export default notificationSlice;
