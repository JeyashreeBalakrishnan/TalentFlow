import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddGoalModal from './AddGoalModal';
import { useState } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Employee';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] text-slate-200 font-sans">
      
      {/* Sidebar - Elite Dark */}
      <aside className="w-64 bg-[#1e293b] border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-6 text-2xl font-bold text-blue-500 italic tracking-tighter">
          TalentFlow
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 cursor-pointer font-medium">
            Dashboard
          </div>
          <div onClick={() => navigate('/goals')}className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer text-slate-400 transition">Performance Goals</div>
          <div onClick={() => navigate('/skills')} className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer text-slate-400 transition">Skill Matrix</div>
          <div onClick={() => navigate('/profile')} className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer text-slate-400 transition">My Profile</div>
        </nav>
        <button className="p-6 text-left hover:bg-red-900/20 text-red-400 font-bold transition border-t border-slate-800">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Elite Header */}
        <header className="h-20 bg-[#1e293b]/50 backdrop-blur-md border-b border-slate-800 px-8 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Performance Overview</h2>
          <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-6">
            {/* Notification Bell */}
         <button onClick={() => navigate('/notifications')} className="relative p-2 text-slate-400 hover:text-white transition">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
           </svg>
           <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#1e293b]"></span>
         </button>

  {/* User Initial Circle */}
  <div onClick={() => navigate('/profile')} className="w-10 h-10 bg-blue-600 rounded-xl ...">
    {userName[0]}
  </div>
</div>

            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{userName}</p>
              <p className="text-xs text-slate-500">Standard Account</p>
            </div>
            <div onClick={() => navigate('/profile')} className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white cursor-pointer hover:scale-105 transition-transform">
              {userName[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-8 overflow-y-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Assigned Goals', val: '05', color: 'text-white' },
              { label: 'Completed', val: '02', color: 'text-green-400' },
              { label: 'Overall Rating', val: '4.8', color: 'text-blue-400' },
              { label: 'Feedback', val: '01', color: 'text-amber-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-[#1e293b] p-6 rounded-3xl border border-slate-800 shadow-xl">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                <h3 className={`text-4xl font-black mt-2 ${stat.color}`}>{stat.val}</h3>
              </div>
            ))}
          </div>

          {/* Goals Section */}
          <div className="bg-[#1e293b] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-xl">Active Performance Goals</h3>
                <p className="text-slate-500 text-sm">Track your progress for Q1 2026</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20">
                + Add New Goal
              </button>
            </div>
            
            <div className="p-20 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 text-slate-600">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-2xl">No active goals found</h4>
              <p className="text-slate-500 mt-2 max-w-sm">
                Your performance track is currently clear. Contact your manager to set new objectives.
              </p>
            </div>
          </div>
        </main>
      </div>
      <AddGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;