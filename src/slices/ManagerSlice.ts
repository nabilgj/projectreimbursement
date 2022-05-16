import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../interfaces/IUser';
import { IReimbursement } from '../interfaces/IReimbursement';

import axios from 'axios';

import { useSelector } from 'react-redux';
import { RootState } from '../store';

// figure out our default state for the slice

// for initialUserState type
interface ManagerSliceState {
  loading: boolean;
  error: boolean;
  reimbursement?: IReimbursement;
  currentProfile?: IUser[];
}

// initial state
const initialManagerState: ManagerSliceState = {
  loading: false,
  error: false,
  // user is nothing becuase we do not have user yet
};

// ================= asyn thunks ========================

let user;

// being called from Button inside HomePage
export const getAllUsers = createAsyncThunk(
  'manager/allusers',
  async (thunkAPI) => {
    user = useSelector((state: RootState) => state.user);
    console.log('coming from getAllUsers async api call line 40 ', user);

    try {
      const res = await axios.get('http://localhost:8000/users/getAllUsers');
      console.log('coming from getAllUsers async api call line 41 ', res.data);

      return {
        userId: res.data.user_id,
        username: res.data.username,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        role: res.data.role,
      };
    } catch (e) {
      console.log(e);
    }
  }
);

// ================= reducer actions ========================
// create slice and will be exported as default
export const ManagerSlice = createSlice({
  name: 'manager',
  initialState: initialManagerState,

  // these are actions inside reducers
  reducers: {
    toggleError: (state) => {
      state.error = !state.error;
    },
  },

  extraReducers: (builder) => {
    // this is where we create our user logic
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.error = false;
      state.loading = false;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

// calls from LoginForm
export const { toggleError } = ManagerSlice.actions;

// will go inside store as reducer
export default ManagerSlice.reducer;
