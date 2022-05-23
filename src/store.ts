import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import userReducer from './slices/UserSlice';
import managerReducer from './slices/ManagerSlice';
import reimbursementReducer from './slices/ReimbursementSlice';

//store.js
const persistConfig = {
  key: 'counter',
  storage,
};

// we wud import our reducers from the slices

const reducers = combineReducers({
  user: userReducer,
  manager: managerReducer,
  reimbursement: reimbursementReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// will go inside index to Proivder prop
// export const store = configureStore({
//   reducer: reducers,
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const store = configureStore({
//   reducer: {
//     // diff reducer slices for our state
//     user: userReducer,
//     manager: managerReducer,
//     reimbursement: reimbursementReducer,
//   },
// });

// 2 other things for state type

// for state
export type RootState = ReturnType<typeof store.getState>;

// for dispatch actions
export type AppDispatch = typeof store.dispatch;
