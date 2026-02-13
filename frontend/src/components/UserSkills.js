import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserSkills = () => {
  const navigate = useNavigate();
  
  const mySkills = [
    { name: 'Frontend Architecture', level: 90, color: 'from-blue-600 to-cyan-500' },
    { name: 'Node.js Backend', level: 75, color: 'from-green-600 to-emerald-400' },
    { name: 'Database Design', level: 65, color: 'from-purple-600 to-pink-500' },
    { name: 'UI/UX Design', level: 80, color: 'from-amber-500 to-orange-400' },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] text-slate-200">
      <div className="flex-1 p-8 lg:p-12 max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <button onClick={() => navigate('/dashboard')} className="text-blue-400 hover:text-white mb-4 flex items-center transition">
              <span className="mr-2">←</span> Back to Dashboard
            </button>
            <h1 className="text-4xl font-black text-white">My Skill Matrix</h1>
          </div>
          <div className="text-right">
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Overall Level</p>
            <p className="text-3xl font-black text-blue-500">Senior III</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Skills List */}
          <div className="lg:col-span-2 space-y-6">
            {mySkills.map((skill, i) => (
              <div key={i} className="bg-[#1e293b] p-6 rounded-3xl border border-slate-800 shadow-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-white text-lg">{skill.name}</h3>
                  <span className="text-slate-400 font-mono">{skill.level}%</span>
                </div>
                <div className="w-full bg-[#0f172a] rounded-full h-3 overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievement Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-2xl text-white">
              <h3 className="font-black text-xl mb-2">Growth Milestone</h3>
              <p className="text-blue-100 text-sm mb-6">You are 15% away from your next promotion level.</p>
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-4 backdrop-blur-md">
                🏆
              </div>
              <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition">
                View Roadmap
              </button>
            </div>
            
            <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="font-bold text-white mb-4">Earned Badges</h3>
              <div className="flex flex-wrap gap-3">
                {['🚀 Fast Learner', '🛠 Bug Squasher', '🎨 UI Pro'].map((badge, i) => (
                  <span key={i} className="bg-[#0f172a] border border-slate-800 px-3 py-2 rounded-lg text-xs font-bold text-slate-400">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserSkills;