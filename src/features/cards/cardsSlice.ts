import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/types";

interface CardsState {
    cards: Product[];
}

const initialState: CardsState = {
    cards: []
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
        }
    }
})

export const { setCard, setCards } = cardsSlice.actions;
export const selectCards = (state: { cards: CardsState }) => state.cards.cards;
export default cardsSlice.reducer;
