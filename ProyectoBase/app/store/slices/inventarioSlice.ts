import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";

interface Producto {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

interface InventarioState {
  productos: Producto[];
}

const initialState: InventarioState = {
  productos: [],
};

export const inventarioSlice = createSlice({
  name: "inventario",
  initialState,
  reducers: {
    agregarProducto: (state, action: PayloadAction<Producto>) => {
      state.productos.push(action.payload);
    },
    actualizarProducto: (state, action: PayloadAction<Producto>) => {
      const index = state.productos.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.productos[index] = action.payload;
      }
    },
    eliminarProducto: (state, action: PayloadAction<string>) => {
      state.productos = state.productos.filter((p) => p.id !== action.payload);
    },
  },
});

export const { agregarProducto, actualizarProducto, eliminarProducto } = inventarioSlice.actions;
export const selectInventario = (state: RootState) => state.inventario.productos;
export default inventarioSlice.reducer;
