import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./slices/usuarioSlice";

export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
