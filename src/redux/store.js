import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice";

const store = configureStore({ reducer: cardReducer });

export default store;
