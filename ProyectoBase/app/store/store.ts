import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./slices/usuarioSlice";
import inventarioReducer from "./slices/inventarioSlice";

export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
    inventario: inventarioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
