import React from 'react';

const ManageEmployees = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] p-10">
      <div className="w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Employee Directory</h1>
            <p className="text-slate-400">124 Total Personnel</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold transition-all transform hover:-translate-y-1">
            + New Employee
          </button>
        </div>

        <div className="bg-[#1e293b] rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-500 text-xs uppercase tracking-widest font-black">
              <tr>
                <th className="p-6">Name</th>
                <th className="p-6">Department</th>
                <th className="p-6">Last Review</th>
                <th className="p-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/20 transition">
                <td className="p-6 flex items-center space-x-3 text-white font-bold">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg"></div>
                  <span>Jane Cooper</span>
                </td>
                <td className="p-6 text-slate-400">Engineering</td>
                <td className="p-6 text-slate-400">Oct 12, 2025</td>
                <td className="p-6"><span className="text-green-500 text-xs font-bold px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">ACTIVE</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;