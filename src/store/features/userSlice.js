import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPlan: (state, action) => {
      state.plan = action.payload;
    },
  },
});

export const { setPlan } = userSlice.actions;
export default userSlice.reducer;
