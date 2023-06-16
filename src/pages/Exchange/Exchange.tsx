import React, { useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { CurrencySelect } from '../../components/СurrencySelect';
import { Loader } from '../../components/Loader';
import { useCurrencies } from '../../hooks/useCurrencies';

interface CurrencyResponseState {
  [key: string]: number;
}

export function Exchange() {
  const { item, loading, error } = useCurrencies();
  const currencyRef = useRef<string>('');
  const [responseError, setResponseError] = useState<string>('');
  const [currencyResponse, setCurrencyResponse] = useState<CurrencyResponseState>({});

  useEffect(() => {
    if (item.length > 0) {
      currencyRef.current = item[0];
      getAllCurrency(currencyRef.current);
    }
  }, [item]);

  const handleFromCurrencyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    await getAllCurrency(selectedCurrency);
  };

  const getAllCurrency = async (selectedCurrency: string) => {
    setResponseError('');
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/fetch-all?from=${selectedCurrency}&api_key=${
          import.meta.env.VITE_ACCESS_KEY
        }`
      );
      setCurrencyResponse(response.data.results);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setResponseError(error.message);
    }
  };

  return (
    <main className="main">
      {loading && <Loader />}
      {!loading && (
        <CurrencySelect title="Currency" values={item} onChange={handleFromCurrencyChange} />
      )}
      {error && <div className="error">{error}</div>}
      {responseError && <div className="error">{responseError}</div>}
      {Object.keys(currencyResponse).length > 0 && (
        <div className="currency-container">
          {Object.entries(currencyResponse).map(([currency, rate]) => (
            <div key={currency} className="currency-item">
              <span className="currency">{currency}: </span>
              <span className="rate">{rate}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
