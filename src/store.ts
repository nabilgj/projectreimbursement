import { configureStore } from '@reduxjs/toolkit';

// we wud import our reducers from the slices

// will go inside index to Proivder prop
export const store = configureStore({
  reducer: {
    // diff reducer slices for our state
  },
});

// 2 other things for state type
// export type as below and use

// for state
export type RootState = ReturnType<typeof store.getState>;

// for dispatch actions
export type AppDispatch = typeof store.dispatch;
