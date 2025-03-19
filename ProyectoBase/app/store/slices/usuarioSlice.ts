import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsuarioState {
  email: string | null;
}

const initialState: UsuarioState = {
  email: null,
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = usuarioSlice.actions;
export default usuarioSlice.reducer;
