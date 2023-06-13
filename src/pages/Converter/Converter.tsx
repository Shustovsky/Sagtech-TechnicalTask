import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { CurrencySelect } from '../../components/СurrencySelect';
import { Loader } from '../../components/Loader';
import { useCurrencies } from '../../hooks/useCurrencies';
import './Converter.scss';

export function Converter() {
  const { item, loading } = useCurrencies();

  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [conversionResult, setConversionResult] = useState<string>('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9.]/g, '');

    setAmount(numericValue);
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!amount || !fromCurrency || !toCurrency) {
      setConversionResult('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=${
          import.meta.env.VITE_ACCESS_KEY
        }`
      );
      setConversionResult(response.data.result[toCurrency]);
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.error('Error converting currencies:', error);
      setConversionResult('Error converting currencies');
    }
  }

  const handleFormReset = (): void => {
    setAmount('');
    setFromCurrency('');
    setToCurrency('');
    setConversionResult('');
  };

  return (
    <main className="main">
      {loading && <Loader />}
      {!loading && (
        <>
          <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
            <input type="text" value={amount} onChange={handleAmountChange} placeholder="Amount" />
            <CurrencySelect title={'From'} values={item} onChange={handleFromCurrencyChange} />
            <CurrencySelect title={'To'} values={item} onChange={handleToCurrencyChange} />
            <button type="submit">Submit</button>
            <button type="reset">Reset form</button>
          </form>
          {conversionResult && <p className="result">{conversionResult}</p>}
        </>
      )}
    </main>
  );
}
