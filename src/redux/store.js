import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registrationReducer from './registrationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
  },
});

export default store;
