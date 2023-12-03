import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FormData} from '../types/types';

const initialState: { formsData: FormData[] } = {
  formsData: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<FormData>) => {
      state.formsData.push(action.payload);
    },
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
