import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
