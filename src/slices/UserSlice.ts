import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../interfaces/IUser';

// figure out our default state for the slice

interface UserSliceState {
  loading: boolean;
  error: boolean;
  user?: IUser;
}
