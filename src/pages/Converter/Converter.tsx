import axios, { AxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { CurrencySelect } from '../../components/СurrencySelect';
import { Loader } from '../../components/Loader';
import { useCurrencies } from '../../hooks/useCurrencies';
import './Converter.scss';

export function Converter() {
  const { item, loading, error } = useCurrencies();
  const [amount, setAmount] = useState<string>('');
  const fromCurrencyRef = useRef<string>('');
  const toCurrencyRef = useRef<string>('');
  const [conversionResult, setConversionResult] = useState<string>('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9.]/g, '');

    setAmount(numericValue);
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fromCurrencyRef.current = e.target.value;
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    toCurrencyRef.current = e.target.value;
  };

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!amount) {
      setConversionResult('Please fill amount field');
      return;
    }
    if (item.length > 0) {
      if (!fromCurrencyRef.current) {
        fromCurrencyRef.current = item[0];
      }
      if (!toCurrencyRef.current) {
        toCurrencyRef.current = item[0];
      }
    }

    try {
      const response = await axios.get(
        `!${import.meta.env.VITE_API_URL}/convert?from=${fromCurrencyRef.current}&to=${
          toCurrencyRef.current
        }&amount=${amount}&api_key=${import.meta.env.VITE_ACCESS_KEY}`
      );
      setConversionResult(response.data.result[toCurrencyRef.current]);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setConversionResult(error.message);
    }
  }

  const handleFormReset = (): void => {
    setAmount('');
    fromCurrencyRef.current = item.length > 0 ? item[0] : '';
    toCurrencyRef.current = item.length > 0 ? item[0] : '';
    setConversionResult('');
  };

  return (
    <main className="main">
      {loading && <Loader />}
      {!loading && (
        <>
          <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Amount"
              className={!amount ? 'error' : ''}
            />
            <CurrencySelect title={'From'} values={item} onChange={handleFromCurrencyChange} />
            <CurrencySelect title={'To'} values={item} onChange={handleToCurrencyChange} />
            <button type="submit">Submit</button>
            <button type="reset">Reset form</button>
          </form>
          {conversionResult && <p className="result">{conversionResult}</p>}
          {error && <div className="error">{error}</div>}
        </>
      )}
    </main>
  );
}
