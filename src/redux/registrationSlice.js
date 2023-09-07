import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
  name: 'registration',
  initialState: [],
  reducers: {
    registerUser: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { registerUser } = registrationSlice.actions;
export default registrationSlice.reducer;
