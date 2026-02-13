import React from 'react';

const PerformanceReviews = () => {
  const reviews = [
    { name: 'Alex Rivera', date: 'Feb 20, 2026', status: 'Upcoming', urgency: 'Low' },
    { name: 'Sarah Chen', date: 'Feb 12, 2026', status: 'Due Today', urgency: 'High' },
    { name: 'Michael Ross', date: 'Feb 05, 2026', status: 'Overdue', urgency: 'Critical' },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] p-10">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-2">Performance Reviews</h1>
        <p className="text-slate-400 mb-10">Monitor and schedule upcoming talent assessments.</p>

        <div className="space-y-4">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex items-center justify-between hover:bg-slate-800/50 transition">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center font-bold text-white">
                  {rev.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{rev.name}</h3>
                  <p className="text-slate-500 text-sm">Scheduled for: {rev.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase border ${
                  rev.urgency === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                  rev.urgency === 'High' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                  'bg-blue-500/10 text-blue-500 border-blue-500/20'
                }`}>
                  {rev.status}
                </span>
                <button className="text-blue-400 hover:text-white font-bold transition">Start Review →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceReviews;