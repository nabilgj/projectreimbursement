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
  // submitted_date: string;
  description: string;
  // reimbursement_author?: number;
  // reimbursement_status_id: number;
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
      console.log('coming from lginUser async api call line 45 ', res.data);

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

// being called from submit Button inside ReimbursementForm
export const getAllResolved = createAsyncThunk(
  'reimburse/getAll',
  async (thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        'http://localhost:8000/reimbursements/getAllResolvedByUser'
      );

      console.log(
        'coming from getAllResolved async api call line 69 ',
        res.data
      );
      return res.data;
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

    builder.addCase(getAllResolved.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllResolved.fulfilled, (state, action) => {
      // payload is the return from our asyn api call
      state.error = false;
      state.loading = false;
    });
  },
});

// calls from LoginForm
export const { toggleError } = ReimbursementSlice.actions;

// will go inside store as reducer
export default ReimbursementSlice.reducer;
