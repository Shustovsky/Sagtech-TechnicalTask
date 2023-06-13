import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Converter } from './pages/Converter/Converter';
import { Exchange } from './pages/Exchange/Exchange';
import './App.scss';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Converter />} />
        <Route path="exchange" element={<Exchange />} />
      </Route>
    </Routes>
  );
}
