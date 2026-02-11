import React, { useState } from 'react';
import { useApp } from '../App';
import { HARDCODED_USERS } from '../constants';

const LoginPage: React.FC = () => {
  const { setCurrentUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = HARDCODED_USERS.find(u => u.email === email);

    if (user && (password === 'admin123' || password === 'vendor123' || password === 'user123')) {
      setCurrentUser(user);
    } else {
      setError('Invalid credentials. Hint: use admin@ems.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-6">
      
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            EMS Portal
          </h2>
          <p className="text-gray-300 text-sm mt-2">
            Event Management System Login
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@xyz.com"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 p-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => { setEmail(''); setPassword(''); setError(''); }}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl font-semibold border border-white/30 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Credentials Info */}
        <div className="mt-10 pt-6 border-t border-white/20 text-xs text-gray-300 text-center space-y-1">
          <p>Admin: admin@abc.com / admin123</p>
          <p>Vendor: vendor@abc.com / vendor123</p>
          <p>User: user@abc.com / user123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
