import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const navLinkClass = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium ${
      location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
    }`;

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    }

  return (
    <nav className="bg-white shadow-md mb-4">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold text-blue-700">Office Management System</h1>
        <div className="space-x-4">
          <Link to="/employees" className={navLinkClass('/employees')}>Employees</Link>
          <Link to="/departments" className={navLinkClass('/departments')}>Departments</Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}