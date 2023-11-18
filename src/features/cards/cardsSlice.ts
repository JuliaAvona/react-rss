import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/types";

interface CardsState {
    cards: Product[],
    isLoading: boolean,
}

const initialState: CardsState = {
    cards: [],
    isLoading: false,
};

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setCard: (state, action: PayloadAction<Product>) => {
            state.cards.push(action.payload);
        },
        setCards: (state, action: PayloadAction<Product[]>) => {
            state.cards = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
})

export const { setCard, setCards, setLoading } = cardsSlice.actions;
export const selectCards = (state: { cards: CardsState }) => state.cards.cards;
export const selectIsLoading = (state: { cards: CardsState }) => state.cards.isLoading;
export default cardsSlice.reducer;
