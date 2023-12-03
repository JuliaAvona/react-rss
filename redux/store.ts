import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const rootReducer = combineReducers({
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});