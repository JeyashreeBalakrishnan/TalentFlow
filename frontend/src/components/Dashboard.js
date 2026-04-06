import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddGoalModal from './AddGoalModal';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Employee';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGoal, setEditingGoal] = useState(null);
  // Unified fetch function that respects the logged-in user
  const fetchMyData = async () => {
    const loggedInUserId = localStorage.getItem('userId');
    if (!loggedInUserId) return;

    try {
      setLoading(true);
      //const res = await axios.get(`http://localhost:5000/api/goals/user/${loggedInUserId}`);
      //const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/goals/user/${loggedInUserId}`);
      const res = await axios.get(`https://talentflow-1eyr.onrender.com/api/goals/user/${loggedInUserId}`);
      setGoals(res.data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchMyData();
  }, []);

  const deleteGoal = async (id) => {
  if (window.confirm("Are you sure you want to delete this goal?")) {
    try {
      //await axios.delete(`http://localhost:5000/api/goals/${id}`);
      //await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/goals/${id}`);
      await axios.delete(`https://talentflow-1eyr.onrender.com/api/goals/${id}`);
      fetchMyData(); // Refresh the list after deleting
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  }
  };
  
  const handleLogout = () => {
  // 1. Clear the stored user data
  localStorage.clear();

  // 2. Send them back to the login page
  
  ///window.location.reload();
  window.location.href = '/login';
};

  const handleEdit = (goal) => {
  setEditingGoal(goal); // Save the goal data
  setIsModalOpen(true); // Open the same modal we use for adding
};

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] text-slate-200 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-6 text-2xl font-bold text-blue-500 italic tracking-tighter">
          TalentFlow
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 cursor-pointer font-medium">
            Dashboard
          </div>
          <div onClick={() => navigate(`/performance/${localStorage.getItem('userId')}`)} className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer text-slate-400 transition">Performance Goals</div>
          <div onClick={() => navigate('/skills')} className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer text-slate-400 transition">Skill Matrix</div>
          <div onClick={() => navigate('/profile')} className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer text-slate-400 transition">My Profile</div>
          
        </nav>
        <button onClick={handleLogout} className="p-6 text-left hover:bg-red-900/20 text-red-400 font-bold transition border-t border-slate-800">
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-20 bg-[#1e293b]/50 backdrop-blur-md border-b border-slate-800 px-8 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Performance Overview</h2>
          <div className="flex items-center space-x-4">
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
      { 
        label: 'Assigned Goals', 
        val: (Array.isArray(goals) ? goals.length : 0).toString().padStart(2, '0'), 
        color: 'text-white' 
      },
      { 
        label: 'Completed', 
        val: (Array.isArray(goals) ? goals.filter(g => g.status === 'Completed').length : 0).toString().padStart(2, '0'), 
        color: 'text-green-400' 
      },
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
      <h3 className="font-bold text-white text-xl">Active Performance Goals</h3>
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold transition"
        onClick={() => { setEditingGoal(null); setIsModalOpen(true); }}
      >
        + Add New Goal
      </button>
    </div>

    <div className="p-6">
      {loading ? (
        <p className="text-center text-slate-500">Loading your goals...</p>
      ) : (Array.isArray(goals) && goals.length > 0) ? (
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal._id} className="relative bg-[#0f172a] p-6 rounded-3xl border border-slate-800 flex justify-between items-center hover:border-blue-500/50 transition">
              <div>
                <h4 className="text-xl font-bold text-white">{goal.title}</h4>
                <p className="text-slate-400 text-sm">{goal.description}</p>
                <span className="text-[10px] text-blue-400 font-black uppercase mt-2 block">{goal.status}</span>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => deleteGoal(goal._id)} 
                  className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl transition font-bold text-xs"
                >
                  Delete
                </button>
                <button 
                   onClick={() => handleEdit(goal)} 
                  className="bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-xl transition font-bold text-xs"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 flex flex-col items-center justify-center text-center">
          <h4 className="text-white font-bold text-2xl">No active goals found</h4>
          <p className="text-slate-500 mt-2">Your performance track is currently clear.</p>
        </div>
      )}
    </div>
  </div>
</main>
  

      {/* Modals */}
      <AddGoalModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); setEditingGoal(null);}} onGoalAdded={fetchMyData} editingGoal={editingGoal}  />
        </div>
        </div>
        );
        };


export default Dashboard;