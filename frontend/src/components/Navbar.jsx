import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('name');
    window.location.reload(); // Refresh page after logout
  };

  return (
    <div className="nav flex flex-col sm:flex-row px-4 sm:px-20 items-center justify-between h-auto sm:h-[90px] bg-[#0f0e0e]">
      <div className="flex w-full justify-between items-center">
        <Link to="/">
          <h3 className="font-bold text-2xl text-white">MultiCodeHub</h3>
        </Link>
        <button className="sm:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      <div
        className={`links flex flex-col sm:flex-row items-center gap-3 sm:gap-5 ${
          isOpen ? 'block' : 'hidden'
        } sm:flex w-full sm:w-auto mt-4 sm:mt-0`}
      >
        <Link className="text-white transition-all hover:text-blue-500" to="/">
          Home
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white transition-all hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white transition-all hover:bg-blue-700 px-4 py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
