
import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../App';
import { UserRole } from '../types';

const Layout: React.FC = () => {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  if (!currentUser) return <Outlet />;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">EMS - Event Management System</h1>
          <span className="text-sm bg-blue-700 px-2 py-1 rounded">Role: {currentUser.role}</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="hidden md:inline">Welcome, {currentUser.name}</span>
          <button 
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-blue-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer / Flow Overview Toggle */}
      <footer className="bg-gray-200 text-center p-2 text-xs text-gray-500">
        &copy; 2024 Event Management System.
      </footer>
    </div>
  );
};

export default Layout;
