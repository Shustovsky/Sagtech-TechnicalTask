import { NavLink, Link, Outlet } from 'react-router-dom';
import './Layout.scss';

export function Layout() {
  return (
    <>
      <header className="header">
        <NavLink to="/">Converter</NavLink>
        <NavLink to="/exchange">Exchange</NavLink>
      </header>

      <Outlet />

      <footer className="footer">
        ©2023
        <Link to="https://github.com/shustovsky/">Github</Link>
      </footer>
    </>
  );
}
