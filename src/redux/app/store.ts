import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import cardsReducer from '../features/cards/cardsSlice';
import { productsApi } from '../../api/api';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cards: cardsReducer,
    [productsApi.reducerPath]: productsApi.reducer
  },   
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
