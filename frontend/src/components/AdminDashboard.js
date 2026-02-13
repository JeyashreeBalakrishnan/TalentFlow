import React from 'react';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] text-slate-200 font-sans">
      {/* Sidebar - Darker Slate */}
      <aside className="w-64 bg-[#1e293b] border-r border-slate-800 flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-500 italic">TalentFlow <span className="text-xs bg-blue-500/10 px-2 py-1 rounded text-blue-400 not-italic">ADMIN</span></div>
        <nav className="flex-1 p-4 space-y-2">
  {/* Global Overview Link */}
  <div 
    onClick={() => navigate('/admin')} 
    className="p-3 bg-blue-600 text-white rounded-xl cursor-pointer font-bold shadow-lg shadow-blue-600/20"
  >
    Global Overview
  </div>

  {/* Manage Employees Link */}
  <div 
    onClick={() => navigate('/admin/employees')} 
    className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer text-slate-400 hover:text-white transition-all"
  >
    Manage Employees
  </div>

  {/* Skill Matrix Link */}
  <div 
    onClick={() => navigate('/admin/skills')} 
    className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer text-slate-400 hover:text-white transition-all"
  >
    Skill Matrix
  </div>

  {/* Performance Reviews Link */}
  <div 
    onClick={() => navigate('/admin/reviews')} 
    className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer text-slate-400 hover:text-white transition-all"
  >
    Performance Reviews
  </div>
</nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Organization Insights</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition">Add New Employee</button>
        </header>

        {/* Admin Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm uppercase">Total Staff</p>
            <h3 className="text-4xl font-bold">124</h3>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm uppercase">Active Goals</p>
            <h3 className="text-4xl font-bold text-blue-400">412</h3>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm uppercase">Reviews Pending</p>
            <h3 className="text-4xl font-bold text-amber-500">18</h3>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm uppercase">Company Rating</p>
            <h3 className="text-4xl font-bold text-green-500">4.2</h3>
          </div>
        </div>
        <button 
  onClick={() => navigate('/')} 
  className="p-6 text-left hover:bg-red-900/20 text-red-400 font-bold transition border-t border-slate-800"
>
  Logout
</button>
        {/* Employee Table Placeholder */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800"><h3 className="font-bold">Recent Employee Activity</h3></div>
          <div className="p-12 text-center text-slate-500">Employee list and activity logs will appear here.</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;