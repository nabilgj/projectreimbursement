import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../interfaces/IUser';

import axios from 'axios';

// figure out our default state for the slice

// for initialUserState type
interface UserSliceState {
  loading: boolean;
  error: boolean;
  user?: IUser;
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
      console.log('coming from lginUser async api call line 38 ', res);

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
  },
});

// calls from LoginForm
export const { toggleError } = UserSlice.actions;

// will go inside store as reducer
export default UserSlice.reducer;
