import { RootState } from '../store';

export const getCurrenciesSelector = (state: RootState) => state.converter;
