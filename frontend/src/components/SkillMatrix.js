import React from 'react';

const SkillMatrix = () => {
  const skills = [
    { name: 'React.js', level: 85, color: 'bg-blue-500' },
    { name: 'Node.js', level: 70, color: 'bg-green-500' },
    { name: 'Python', level: 60, color: 'bg-yellow-500' },
    { name: 'Cloud Architecture', level: 45, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] text-slate-200 p-10">
      <div className="max-w-5xl w-full mx-auto">
        <header className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl font-black text-white tracking-tight">Global Skill Matrix</h1>
          <p className="text-slate-400 mt-2">Technical competency distribution across the organization.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, i) => (
            <div key={i} className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 shadow-xl hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-white">{skill.name}</span>
                <span className="text-blue-400 font-black">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-slate-800 p-1">
                <div 
                  className={`${skill.color} h-full rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]`} 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillMatrix;