import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  
  // Get real data from localStorage
  const userName = localStorage.getItem('userName') || 'Employee Name';
  const userEmail = localStorage.getItem('userEmail') || 'employee@company.com';
  const userRole = localStorage.getItem('role') || 'Team Member';

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] text-slate-200 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1e293b] border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-6 text-2xl font-bold text-blue-500 italic tracking-tighter">
          TalentFlow
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div 
            onClick={() => navigate('/dashboard')} 
            className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer text-slate-400 transition"
          >
            ← Back to Dashboard
          </div>
          <div className="p-3 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg font-medium cursor-default">
            My Profile
          </div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer text-slate-400 transition">
            Security Settings
          </div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer text-slate-400 transition">
            Notifications
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-white">Profile Settings</h1>
          <p className="text-slate-400 mt-2 text-lg">Manage your personal information and account preferences.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Basic Info */}
          <div className="xl:col-span-1">
            <div className="bg-[#1e293b] rounded-3xl p-8 border border-slate-800 flex flex-col items-center text-center shadow-2xl">
              <div className="w-32 h-32 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center text-5xl font-bold text-white mb-6 border-4 border-[#0f172a] shadow-lg">
                {userName[0]}
              </div>
              <h2 className="text-2xl font-bold text-white">{userName}</h2>
              <p className="text-blue-400 font-medium mb-4">{userRole}</p>
              <div className="w-full h-px bg-slate-800 my-4"></div>
              <p className="text-sm text-slate-400 italic">"Committed to delivering excellence and continuous growth within the team."</p>
            </div>
          </div>

          {/* Right Column: Detailed Forms */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Personal Information Section */}
            <div className="bg-[#1e293b] rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="px-8 py-6 border-b border-slate-800 bg-[#1e293b]/50">
                <h3 className="text-xl font-bold text-white">Account Information</h3>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <p className="text-lg font-medium py-2 px-4 bg-[#0f172a] rounded-xl border border-slate-800 text-slate-200">{userName}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <p className="text-lg font-medium py-2 px-4 bg-[#0f172a] rounded-xl border border-slate-800 text-slate-200">{userEmail}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Department</label>
                  <p className="text-lg font-medium py-2 px-4 bg-[#0f172a] rounded-xl border border-slate-800 text-slate-200">Engineering</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Employee ID</label>
                  <p className="text-lg font-medium py-2 px-4 bg-[#0f172a] rounded-xl border border-slate-800 text-slate-200">TF-99281</p>
                </div>
              </div>
              
              <div className="px-8 py-6 bg-slate-800/20 border-t border-slate-800 flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-600/20">
                  Update Profile
                </button>
              </div>
            </div>

            {/* Account Status / Stats Section */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-3xl border border-blue-500/20 p-8 flex justify-between items-center shadow-xl">
              <div>
                <h4 className="text-lg font-bold text-white">System Status</h4>
                <p className="text-blue-300 text-sm">Your account is active and verified.</p>
              </div>
              <div className="flex space-x-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-500 font-bold uppercase tracking-tighter">Verified</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;