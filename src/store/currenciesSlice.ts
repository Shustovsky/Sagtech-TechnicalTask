import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SliceCaseReducers,
  AnyAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

export interface CurrencyState {
  item: string[];
  loading: boolean;
  error: string;
}

export const initialState: CurrencyState = {
  item: [],
  loading: false,
  error: '',
};

export const fetchCurrencies = createAsyncThunk<string[], void>('posts/getPosts', async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/currencies?api_key=${import.meta.env.VITE_ACCESS_KEY}`
  );
  return Object.keys(response.data.currencies);
});

const pendingAction = fetchCurrencies.pending.type;
const fulfilledAction = fetchCurrencies.fulfilled.type;
const rejectedAction = fetchCurrencies.rejected.type;

export const currenciesSlice = createSlice<CurrencyState, SliceCaseReducers<CurrencyState>>({
  name: 'converter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pendingAction, (state) => {
      state.loading = true;
    });

    builder.addCase(fulfilledAction, (state, action: PayloadAction<string[]>) => {
      state.item = action.payload;
      state.loading = false;
    });

    builder.addCase(rejectedAction, (state, action: AnyAction) => {
      state.error = action.error.message + '. Please reload the page.';
      state.loading = false;
    });
  },
});

export default currenciesSlice.reducer;
