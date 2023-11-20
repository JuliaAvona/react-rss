import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice';
import cardsReducer from '../features/cards/cardsSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
        cards: cardsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
