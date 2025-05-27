import { configureStore } from "@reduxjs/toolkit";
import pokeReducer from "./poke/pokeSlice";

export const store = configureStore({
  reducer: { poke: pokeReducer },
});
