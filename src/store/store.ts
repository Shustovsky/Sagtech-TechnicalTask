import { configureStore } from '@reduxjs/toolkit';
import converterReducer from './currenciesSlice';

export const store = configureStore({
  reducer: {
    converter: converterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
