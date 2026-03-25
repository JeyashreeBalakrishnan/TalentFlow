import React, { useState, useEffect } from 'react'; // Add useState and useEffect
import { useNavigate, useParams } from 'react-router-dom'; // Add useParams
import axios from 'axios';

const PerformanceGoals = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // This gets the ID from the URL (e.g., Jerry's ID)
  const [goals, setGoals] = useState([]); // Replace the hardcoded array with state

  useEffect(() => {
  const fetchGoals = async () => {
    // Priority 1: Check if an ID exists in the URL (Admin viewing an employee)
    // Priority 2: Fallback to the logged-in user's own ID from storage
    const targetUserId = id || localStorage.getItem('userId');

    if (!targetUserId || targetUserId === "undefined") {
      console.error("No valid user ID available for fetching goals");
      return;
    }

    try {
      //const res = await axios.get(`http://localhost:5000/api/goals/user/${targetUserId}`);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/goals/user/${targetUserId}`);
      setGoals(res.data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  fetchGoals();
}, [id]); // Keep [id] so it re-fetches if you switch employees
const handleUpdateProgress = async (goalId, newProgress) => {
  try {
    // 1. Send the update to the backend
    //await axios.patch(`http://localhost:5000/api/goals/${goalId}`
    await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/goals/${goalId}`, {
      progress: Number(newProgress),
      // Automatically set status to 'Completed' if progress hits 100
      status: Number(newProgress) === 100 ? 'Completed' : 'In Progress'
    });

    // 2. Update the local state so the bar moves immediately
    setGoals(goals.map(g => 
      g._id === goalId ? { ...g, progress: newProgress } : g
    ));

    console.log("Progress updated successfully!");
  } catch (err) {
    console.error("Failed to update progress:", err);
    alert("Could not save progress. Check if your backend PATCH route exists.");
  }
};
// Calculate the average progress of all goals
// If there are no goals, default to 0 to avoid "NaN%"
const completionRate = goals.length > 0 
  ? Math.round(goals.reduce((acc, goal) => acc + (goal.progress || 0), 0) / goals.length) 
  : 0;
  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] text-slate-200 p-8 lg:p-12">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <header className="flex justify-between items-end mb-12">
          <div>
            <button onClick={() => navigate('/dashboard')} className="text-blue-400 hover:text-white mb-4 flex items-center transition">
              <span className="mr-2">←</span> Back to Dashboard
            </button>
            <h1 className="text-4xl font-black text-white">Performance Goals</h1>
            <p className="text-slate-400 mt-2">Track and manage your professional objectives.</p>
          </div>
          <div className="bg-[#1e293b] px-6 py-3 rounded-2xl border border-slate-800 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Completion Rate</p>
            <p className="text-2xl font-black text-blue-500">{completionRate}%</p>
          </div>
        </header>

        {/* Goals List */}
        <div className="grid gap-6">
          {goals.map((goal) => (
            <div key={goal._id} className="bg-[#1e293b] p-8 rounded-[2rem] border border-slate-800 shadow-xl hover:border-slate-700 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`w-2 h-2 rounded-full ${
                      goal.status === 'Completed' ? 'bg-green-500' : 
                      goal.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-500'
                    }`}></span>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">{goal.title}</h3>
                  </div>
                  <div className="flex space-x-4 text-sm text-slate-500">
                    <span>Target: {goal.deadline}</span>
                    <span>•</span>
                    <span className={
                      goal.priority === 'High' ? 'text-red-400 font-bold' : 
                      goal.priority === 'Medium' ? 'text-amber-400' : 'text-slate-400'
                    }>{goal.priority} Priority</span>
                  </div>
                </div>

                <div className="w-full md:w-64">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-400">PROGRESS</span>
                    <span className="text-white">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-[#0f172a] h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  min="0" 
                  max="100"
                  className="w-16 bg-[#0f172a] text-white border border-slate-700 rounded px-2 py-1 text-sm"
                  defaultValue={goal.progress}
                  onBlur={(e) => handleUpdateProgress(goal._id, e.target.value)}
                />
                <span className="text-slate-400 text-xs">%</span>
               </div>
                <button className="bg-[#0f172a] hover:bg-slate-800 text-slate-300 px-5 py-2 rounded-xl border border-slate-800 font-bold transition">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceGoals;