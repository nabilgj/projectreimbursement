import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../interfaces/IUser';
import { IReimbursement } from '../interfaces/IReimbursement';

import axios from 'axios';

// figure out our default state for the slice

// for initialUserState type
interface UserSliceState {
  loading: boolean;
  error: boolean;
  user?: IUser;
  reimbursement?: IReimbursement;
  currentProfile?: IUser;
}

// initial state
const initialUserState: UserSliceState = {
  loading: false,
  error: false,
  // user is nothing becuase we do not have user yet
};

// ================= asyn thunks ========================
type Login = {
  emailOrUsername: string;
  password: string;
};

// being called from Login Button inside LoginForm
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: Login, thunkAPI) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/users/login',
        credentials
      );
      console.log('coming from lginUser async api call line 41 ', res.data);

      return {
        userId: res.data.user_id,
        username: res.data.username,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        role: res.data.role,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

// being called from ProfilePage
export const getUserDetailsForManager = createAsyncThunk(
  'users/get',
  async (id: number | string, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/reimbursements/getAllRequestsByEmployee/${id}`
      );

      console.log('coming from line 66 ', res);

      return {
        userId: res.data.user_id,
        username: res.data.username,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        role: res.data.role,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

// ================= reducer actions ========================
// create slice and will be exported as default
export const UserSlice = createSlice({
  name: 'user',
  initialState: initialUserState,

  // these are actions inside reducers
  reducers: {
    toggleError: (state) => {
      state.error = !state.error;
    },
  },

  extraReducers: (builder) => {
    // this is where we create our user logic
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.user = action.payload;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(getUserDetailsForManager.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getUserDetailsForManager.fulfilled, (state, action) => {
      state.loading = false;
      state.currentProfile = action.payload;
    });
  },
});

// calls from LoginForm
export const { toggleError } = UserSlice.actions;

// will go inside store as reducer
export default UserSlice.reducer;
