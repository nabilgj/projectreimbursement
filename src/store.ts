import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/UserSlice';

// we wud import our reducers from the slices

// will go inside index to Proivder prop
export const store = configureStore({
  reducer: {
    // diff reducer slices for our state
    user: userReducer,
  },
});

// 2 other things for state type

// for state
export type RootState = ReturnType<typeof store.getState>;

// for dispatch actions
export type AppDispatch = typeof store.dispatch;
