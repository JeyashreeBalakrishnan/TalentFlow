import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();

  const alerts = [
    { id: 1, title: 'New Feedback', desc: 'Your manager left a comment on your Q1 goals.', time: '2h ago', type: 'info' },
    { id: 2, title: 'Deadline Approaching', desc: 'The "React Certification" goal is due in 3 days.', time: '5h ago', type: 'warning' },
    { id: 3, title: 'Skill Verified', desc: 'Admin verified your "Node.js" skill level.', time: 'Yesterday', type: 'success' },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] text-slate-200 p-8">
      <div className="max-w-3xl mx-auto w-full">
        <header className="flex justify-between items-center mb-10">
          <div>
            <button onClick={() => navigate('/dashboard')} className="text-blue-400 hover:text-white transition text-sm mb-2 block">← Back</button>
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
          </div>
          <button className="text-slate-500 hover:text-white text-sm">Mark all as read</button>
        </header>

        <div className="space-y-4">
          {alerts.map((item) => (
            <div key={item.id} className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex items-start space-x-4 hover:border-slate-600 transition">
              <div className={`w-3 h-3 mt-2 rounded-full flex-shrink-0 ${
                item.type === 'warning' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 
                item.type === 'success' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 
                'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
              }`}></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <span className="text-xs text-slate-500 font-mono">{item.time}</span>
                </div>
                <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;