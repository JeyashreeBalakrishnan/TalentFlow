import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillMatrix = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });

  const fetchSkills = async () => {
    //const res = await axios.get('http://localhost:5000/api/skills');
    //const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/skills`);
    const res = await axios.get('https://talentflow-1eyr.onrender.com/api/skills');
    setSkills(res.data);
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    //await axios.post('http://localhost:5000/api/skills/add', newSkill);
    //await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/skills/add`, newSkill);
    await axios.post('https://talentflow-1eyr.onrender.com/api/skills/add', newSkill);
    setNewSkill({ name: '', level: 'Beginner' });
    fetchSkills();
  };

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8">Skill Matrix</h2>
      
      {/* Quick Add Form */}
      <form onSubmit={handleAddSkill} className="mb-10 flex gap-4">
        <input 
          className="bg-slate-800 p-3 rounded-xl flex-1 outline-none border border-slate-700 focus:border-blue-500"
          placeholder="Enter Skill (e.g. React, Python)"
          value={newSkill.name}
          onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
        />
        <select 
          className="bg-slate-800 p-3 rounded-xl outline-none border border-slate-700"
          value={newSkill.level}
          onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>
        <button className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition">Add Skill</button>
      </form>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map(skill => (
          <div key={skill._id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h4 className="text-xl font-bold mb-2">{skill.name}</h4>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full ${skill.level === 'Expert' ? 'w-full bg-green-400' : skill.level === 'Intermediate' ? 'w-2/3 bg-blue-400' : 'w-1/3 bg-amber-400'}`}
              ></div>
            </div>
            <p className="text-xs mt-2 text-slate-400 uppercase font-bold tracking-widest">{skill.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMatrix;