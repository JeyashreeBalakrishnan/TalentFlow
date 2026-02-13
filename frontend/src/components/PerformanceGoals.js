import React from 'react';
import { useNavigate } from 'react-router-dom';

const PerformanceGoals = () => {
  const navigate = useNavigate();

  const goals = [
    { id: 1, title: 'Complete React Certification', deadline: 'Mar 15, 2026', status: 'In Progress', progress: 65, priority: 'High' },
    { id: 2, title: 'Optimize Database Queries', deadline: 'Mar 30, 2026', status: 'Pending', progress: 0, priority: 'Medium' },
    { id: 3, title: 'Improve System Documentation', deadline: 'Feb 28, 2026', status: 'Completed', progress: 100, priority: 'Low' },
  ];

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
            <p className="text-2xl font-black text-blue-500">66%</p>
          </div>
        </header>

        {/* Goals List */}
        <div className="grid gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-[#1e293b] p-8 rounded-[2rem] border border-slate-800 shadow-xl hover:border-slate-700 transition-all group">
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