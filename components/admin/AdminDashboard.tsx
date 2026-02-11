import React, { useState } from 'react';
import { useApp } from '../../App';
import { HARDCODED_USERS, MEMBERSHIP_OPTIONS } from '../../constants';
import { Membership, UserRole } from '../../types';

const AdminDashboard: React.FC = () => {
  const { memberships, setMemberships } = useApp();

  const [view, setView] = useState<'home' | 'membership' | 'users'>('home');
  const [activeAction, setActiveAction] = useState<'add' | 'update' | null>(null);

  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [duration, setDuration] = useState<Membership['duration']>('6 Months');
  const [membershipNo, setMembershipNo] = useState('');

  const vendors = HARDCODED_USERS.filter(u => u.role === UserRole.VENDOR);

  const handleAddMembership = () => {
    if (!selectedVendorId) return alert('Please select a vendor');

    const newMembership: Membership = {
      id: Math.random().toString(36).substr(2, 9),
      vendorId: selectedVendorId,
      duration,
      status: 'Active',
    };

    setMemberships([...memberships, newMembership]);
    alert('Membership added successfully');
    setActiveAction(null);
  };

  const handleUpdateMembership = () => {
    if (!membershipNo) return alert('Membership ID required');

    const index = memberships.findIndex(m => m.id === membershipNo);
    if (index === -1) return alert('Membership not found');

    const updated = [...memberships];
    updated[index].duration = duration;
    setMemberships(updated);

    alert('Membership updated');
    setActiveAction(null);
  };

  /* ---------------- HOME ---------------- */
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 p-8 text-white">
        <h1 className="text-4xl font-extrabold mb-10">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => setView('membership')}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-xl hover:scale-105 transition flex flex-col items-center"
          >
            <span className="text-5xl mb-4">💳</span>
            <h2 className="text-2xl font-bold">Membership</h2>
            <p className="text-gray-300 text-sm mt-2">Add / Update memberships</p>
          </button>

          <button
            onClick={() => setView('users')}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-xl hover:scale-105 transition flex flex-col items-center"
          >
            <span className="text-5xl mb-4">👥</span>
            <h2 className="text-2xl font-bold">Users & Vendors</h2>
            <p className="text-gray-300 text-sm mt-2">Manage users & vendors</p>
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- MEMBERSHIP ---------------- */
  if (view === 'membership') {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView('home')}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            ← Home
          </button>
          <h2 className="text-3xl font-bold">Membership Management</h2>
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => setActiveAction('add')}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeAction === 'add'
                ? 'bg-indigo-600'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Add Membership
          </button>

          <button
            onClick={() => setActiveAction('update')}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeAction === 'update'
                ? 'bg-purple-600'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Update Membership
          </button>
        </div>

        {activeAction === 'add' && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl max-w-xl">
            <h3 className="text-xl font-bold mb-6">Add Membership</h3>

            <select
              value={selectedVendorId}
              onChange={e => setSelectedVendorId(e.target.value)}
              className="w-full mb-4 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white"
            >
              <option value="">Select Vendor</option>
              {vendors.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>

            <div className="flex gap-4 mb-6">
              {MEMBERSHIP_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={duration === opt}
                    onChange={() => setDuration(opt as any)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleAddMembership}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold hover:scale-105 transition"
            >
              Save Membership
            </button>
          </div>
        )}

        {activeAction === 'update' && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl max-w-xl">
            <h3 className="text-xl font-bold mb-6">Update Membership</h3>

            <input
              value={membershipNo}
              onChange={e => setMembershipNo(e.target.value)}
              placeholder="Membership ID"
              className="w-full mb-4 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white"
            />

            <div className="flex gap-4 mb-6">
              {MEMBERSHIP_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={duration === opt}
                    onChange={() => setDuration(opt as any)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleUpdateMembership}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold hover:scale-105 transition"
            >
              Update Membership
            </button>
          </div>
        )}

        <div className="overflow-x-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-white/20">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Vendor</th>
                <th className="px-6 py-4 text-left">Duration</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((m, i) => (
                <tr key={m.id} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                  <td className="px-6 py-4">{m.id}</td>
                  <td className="px-6 py-4">
                    {vendors.find(v => v.id === m.vendorId)?.name}
                  </td>
                  <td className="px-6 py-4">{m.duration}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* ---------------- USERS ---------------- */
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <button
        onClick={() => setView('home')}
        className="mb-6 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
      >
        ← Home
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold mb-4">Users</h3>
          {HARDCODED_USERS.filter(u => u.role === UserRole.USER).map(u => (
            <div key={u.id} className="flex justify-between py-2 border-b border-white/10">
              <span>{u.name}</span>
              <span className="text-gray-400 text-xs">{u.email}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold mb-4">Vendors</h3>
          {HARDCODED_USERS.filter(u => u.role === UserRole.VENDOR).map(v => (
            <div key={v.id} className="flex justify-between py-2 border-b border-white/10">
              <span>{v.name}</span>
              <span className="text-gray-400 text-xs">{v.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
