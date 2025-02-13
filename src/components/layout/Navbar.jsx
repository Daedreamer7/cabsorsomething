import React from 'react';
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';
import { ROLES } from '../../config/roles';

const Navbar = ({ userRole, setUserRole }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          {/* Role Switcher (for testing) */}
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {Object.values(ROLES).map(role => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700">
            <FiBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-sm text-left">
              <p className="font-medium text-gray-700">John Doe</p>
              <p className="text-gray-500">{userRole}</p>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
