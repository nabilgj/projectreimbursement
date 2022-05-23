import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../interfaces/IUser';
import { IReimbursement } from '../interfaces/IReimbursement';

import axios from 'axios';

// figure out our default state for the slice

// for initialUserState type
interface ReimbursementSliceState {
  loading: boolean;
  error: boolean;
  user?: IUser;
  reimbursement?: IReimbursement;
  currentProfile?: IUser;
  allPending?: IReimbursement[];
  allResolved?: IReimbursement[];
}

// initial state
const initialReimbursementState: ReimbursementSliceState = {
  loading: false,
  error: false,
  // user is nothing becuase we do not have user yet
};

// ================= asyn thunks ========================
type reimb = {
  amount: number;
  description: string;
  reimbursementType: number;
};

// being called from submit Button inside ReimbursementForm
export const submitReimbursement = createAsyncThunk(
  'reimburse/submit',
  async (rDetails: reimb, thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        'http://localhost:8000/reimbursements/createRequest',
        rDetails
      );

      return {
        amount: res.data.amount,
        description: res.data.description,
        reimbursementType: res.data.reimbursementType,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

let res: any;

// being called from submit Button inside ReimbursementForm
export const getAllPendingByUser = createAsyncThunk(
  'pending/getAll',
  async (thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      res = await axios.get(
        'http://localhost:8000/reimbursements/getAllPendingByUser'
      );

      return {
        reqId: res.data.user_id,
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

// being called from submit Button inside ReimbursementForm
export const getAllResolvedByUser = createAsyncThunk(
  'resolved/getAll',
  async (thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      res = await axios.get(
        'http://localhost:8000/reimbursements/getAllResolvedByUser'
      );
    } catch (e) {
      console.log(e);
    }
  }
);

// ================= reducer actions ========================
// create slice and will be exported as default
export const ReimbursementSlice = createSlice({
  name: 'reimbursement',
  initialState: initialReimbursementState,

  // these are actions inside reducers
  reducers: {
    toggleError: (state) => {
      state.error = !state.error;
    },
  },

  extraReducers: (builder) => {
    // this is where we create our user logic
    builder.addCase(submitReimbursement.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(submitReimbursement.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.reimbursement = action.payload;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(submitReimbursement.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
    // this is where we create our user logic
    builder.addCase(getAllPendingByUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPendingByUser.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.allPending = res.data;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(getAllPendingByUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(getAllResolvedByUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllResolvedByUser.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.allResolved = res.data;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(getAllResolvedByUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

// calls from LoginForm
export const { toggleError } = ReimbursementSlice.actions;

// will go inside store as reducer
export default ReimbursementSlice.reducer;
