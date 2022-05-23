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

let res: any;

// being called from Login Button inside LoginForm
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: Login, thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      res = await axios.post('http://localhost:8000/users/login', credentials);

      return {
        user_id: res.data.user_id,
        username: res.data.username,
        email: res.data.email,
        password: res.data.password,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        role: res.data.role,
        role_id: res.data.role_id,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

type userEdit = {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  user_id?: number;
  // role_id: number;
};

// being called from Login Button inside LoginForm
export const editUser = createAsyncThunk(
  'user/edituser',
  async (credentials: userEdit, thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        'http://localhost:8000/users/update',
        credentials
      );

      return {
        user_id: res.data.user_id,
        username: res.data.username,
        email: res.data.email,
        password: res.data.password,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        role: res.data.role,
        role_id: res.data.role_id,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

let response: any;

// being called from Logout Button inside Navbar
export const logoutUser = createAsyncThunk('user/logout', async (thunkAPI) => {
  try {
    axios.defaults.withCredentials = true;
    response = await axios.delete('http://localhost:8000/users/logout');
  } catch (e) {
    console.log('something went wrong');
  }
});

// being called from ProfilePage
export const getUserDetailsForManager = createAsyncThunk(
  'users/get',
  async (id: number | string, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/reimbursements/getAllRequestsByEmployee/${id}`
      );

      return {
        user_id: res.data.user_id,
        username: res.data.username,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        role: res.data.role,
        role_id: res.data.role_id,
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

    builder.addCase(editUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.user = action.payload;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(editUser.rejected, (state, action) => {
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
    builder.addCase(getUserDetailsForManager.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(logoutUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = undefined;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

// calls from LoginForm
export const { toggleError } = UserSlice.actions;

// will go inside store as reducer
export default UserSlice.reducer;
