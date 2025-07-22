import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isModalOpen: boolean;
  isConfirmPopupOpen: boolean;
  selectTaskId?: string | null; // Optional, can be set later
  isEditMode?: boolean;
  dropdownOpen: boolean;
}

const initialState: UIState = {
  isModalOpen: false,
  isConfirmPopupOpen: false,
  selectTaskId: null,
  isEditMode: false,
  dropdownOpen: false,
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
    showConfirmPopup(state) {
      state.isConfirmPopupOpen = true;
    },
    hideConfirmPopup(state) {
      state.isConfirmPopupOpen = false;
    },
    selectedTaskId(state, action) {
      state.selectTaskId = action.payload;
    },
    clearSelectedTaskId(state){
      state.selectTaskId = null;
    },
    setEditMode(state){
      state.isEditMode = true;
    },
   
    unsetEditMode(state){
      state.isEditMode = false;
    },
    setDropdownOpen: (state, action) => {
      state.dropdownOpen = action.payload;
    },
    toggleDropdown: (state) => {
      state.dropdownOpen = !state.dropdownOpen;
    },
  },

});

export const {
  toggleModal,
  openModal,
  closeModal,
  showConfirmPopup,
  hideConfirmPopup,
  selectedTaskId,
  clearSelectedTaskId,
  setEditMode,
  unsetEditMode,
  setDropdownOpen,
  toggleDropdown,
} = uiSlice.actions;
export default uiSlice.reducer;
