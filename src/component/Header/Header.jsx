import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo2.png";
import useOnlineOffline from "../../Hooks/useOnlineOffline";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const state = useOnlineOffline();
  console.log(state);

  return (
    <header className="bg-blue-600 text-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo + Store Name */}
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <img
            src={logo}
            alt="Store Logo"
            className="h-14 w-auto object-contain"
          />

          {/* Store name */}
          <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
            E-comm-Store
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-white transition text-l font-bold">
            Home
          </Link>
          <Link
            to="/product"
            className="hover:text-white transition text-l font-bold"
          >
            Products
          </Link>
          <Link
            to="/Cart"
            className="hover:text-white transition text-l font-bold"
          >
            Cart
          </Link>
          <Link
            to="/Contact"
            className="hover:text-white transition text-l font-bold"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              /* Close (✖) — forced black */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "#000" }} // <- inline color ensures black
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger — also black for consistency */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "#000" }} // <- inline color ensures black
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-blue-100 px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block w-full text-left hover:text-blue-700 text-l font-bold"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/product"
            className="block w-full text-left hover:text-blue-700 text-l font-bold"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/Cart"
            className="block w-full text-left hover:text-blue-700 text-l font-bold"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
          <Link
            to="/Contact"
            className="block w-full text-left hover:text-blue-700 text-l font-bold"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
