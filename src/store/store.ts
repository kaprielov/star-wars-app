import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';

const store = configureStore({
  reducer: {
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
