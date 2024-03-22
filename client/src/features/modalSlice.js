import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalActive: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.isModalActive = true;
    },
    closeModal(state) {
      state.isModalActive = false;
    },
    toggleModal(state) {
      state.isModalActive = !state.isModalActive;
    },
  },
});

export default modalSlice.reducer;

export const { toggleModal, openModal, closeModal } = modalSlice.actions;
