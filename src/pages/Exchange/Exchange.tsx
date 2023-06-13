import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { CurrencySelect } from '../../components/СurrencySelect';
import { Loader } from '../../components/Loader';
import { useCurrencies } from '../../hooks/useCurrencies';

interface CurrencyResponseState {
  [key: string]: number;
}

export function Exchange() {
  const { item, loading } = useCurrencies();
  const [currencyResponse, setCurrencyResponse] = useState<CurrencyResponseState>({});

  const handleFromCurrencyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/fetch-all?from=${selectedCurrency}&api_key=${
          import.meta.env.VITE_ACCESS_KEY
        }`
      );
      setCurrencyResponse(response.data.results);
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.error('Error converting currencies:', error);
    }
  };

  return (
    <main className="main">
      {loading && <Loader />}
      {!loading && (
        <CurrencySelect title="Currency" values={item} onChange={handleFromCurrencyChange} />
      )}
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
