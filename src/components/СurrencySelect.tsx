import React from 'react';

interface CurrencySelectProps {
  title: string;
  values: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CurrencySelect({ title, values, onChange }: CurrencySelectProps) {
  return (
    <>
      <label htmlFor={`${title}-select`}>{title}</label>

      <select id={`${title}-select`} onChange={onChange}>
        <option></option>
        {values.map((value) => (
          <option value={value} key={title + value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
