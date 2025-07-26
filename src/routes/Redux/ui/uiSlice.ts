import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isModalOpen: boolean;
}

const initialState: UIState = {
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    
  },

});

export const {
  toggleModal,
  openModal,
  closeModal,
  
} = uiSlice.actions;
export default uiSlice.reducer;
