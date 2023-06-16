import { useAppDispatch, useAppSelector } from './reduxHook';
import { getCurrenciesSelector } from '../store/selectors/selectors';
import { useEffect } from 'react';
import { fetchCurrencies } from '../store/currenciesSlice';

export function useCurrencies() {
  const dispatch = useAppDispatch();
  const { item, loading, error } = useAppSelector(getCurrenciesSelector);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return { item, loading, error };
}
