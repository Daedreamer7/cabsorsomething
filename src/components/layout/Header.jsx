import React from 'react';
import { FiBell, FiSettings, FiUser } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100">
            <FiBell className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100">
            <FiSettings className="w-6 h-6" />
          </button>
          <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100">
            <FiUser className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
