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
  pendingReimbursements?: IReimbursement[];
  resolvedReimbursements?: IReimbursement[];
  requestResolve?: IReimbursement[];
  currentProfile?: IUser[];
  allUsers?: IUser[];
  indEmployee?: IReimbursement[];
}

// initial state
const initialManagerState: ManagerSliceState = {
  loading: false,
  error: false,
  // user is nothing becuase we do not have user yet
};

// ================= asyn thunks ========================

let user: any;

// being called from Button inside HomePage
export const getAllUsers = createAsyncThunk(
  'manager/allusers',
  async (thunkAPI) => {
    // user = useSelector((state: RootState) => state.user);
    // console.log('coming from getAllUsers async api call line 37 ', user);

    try {
      axios.defaults.withCredentials = true;
      res = await axios.get('http://localhost:8000/users/getAllUsers');
      console.log('coming from getAllUsers async api call line 46 ', res.data);

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

let res: any;
// being called from Button inside HomePage
export const getAllPending = createAsyncThunk(
  'manager/allPending',
  async (thunkAPI) => {
    // user = useSelector((state: RootState) => state.user);
    // console.log('all users from getAllPending async api call line 62 ', user);

    try {
      axios.defaults.withCredentials = true;
      res = await axios.get(
        'http://localhost:8000/reimbursements/getAllPending'
      );
    } catch (e) {
      console.log(e);
    }
  }
);

// being called from Button inside HomePage
export const getAllResolved = createAsyncThunk(
  'manager/allResolved',
  async (thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      res = await axios.get(
        'http://localhost:8000/reimbursements/getAllResolved'
      );
      console.log(
        'coming from getAllResolved async api call line 106 ',
        res.data
      );
    } catch (e) {
      console.log(e);
    }
  }
);

type resolveRequest = {
  reimbursementId?: number;
  status?: number;
};

// being called from Approve Button inside ViewApproveDeny
export const getRequestResolved = createAsyncThunk(
  'user/resolveReq',
  async (credentials: resolveRequest, thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        'http://localhost:8000/reimbursements/resolveRequest',
        credentials
      );
      console.log('coming from editUser async api call line 139 ', res.data);
    } catch (e) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

// type individualEmp = {
//   id: number;
// };

// being called from Approve Button inside ViewApproveDeny
export const getSingleEmployeeRequests = createAsyncThunk(
  'user/singleEmployee',
  async (id: number, thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      res = await axios.get(
        `http://localhost:8000/reimbursements/getAllRequestsByEmployee/${id}`
      );
      console.log('coming from editUser async api call line 131 ', res.data);
    } catch (e) {
      return thunkAPI.rejectWithValue('something went wrong');
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
      state.allUsers = res.data;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    // this is where we create our user logic
    builder.addCase(getAllPending.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPending.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.pendingReimbursements = res.data;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(getAllPending.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    // this is where we create our user logic
    builder.addCase(getAllResolved.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllResolved.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.requestResolve = res.data;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(getAllResolved.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    // this is where we create our user logic
    builder.addCase(getRequestResolved.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRequestResolved.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.resolvedReimbursements = res.data;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(getRequestResolved.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    // this is where we create our user logic
    builder.addCase(getSingleEmployeeRequests.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSingleEmployeeRequests.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.indEmployee = res.data;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(getSingleEmployeeRequests.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

// calls from LoginForm
export const { toggleError } = ManagerSlice.actions;

// will go inside store as reducer
export default ManagerSlice.reducer;
