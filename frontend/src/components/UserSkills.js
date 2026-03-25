import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserSkills = () => {
  const { id } = useParams();
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner', category: 'Technical' });
  const [loading, setLoading] = useState(true);
  
  const targetUserId = id || localStorage.getItem('userId');

  const fetchSkills = async () => {
    try {
      //const res = await axios.get(`http://localhost:5000/api/skills/user/${targetUserId}`);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/skills/user/${targetUserId}`);
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const deleteSkill = async (id) => {
  if (window.confirm("Remove this skill from your profile?")) {
    try {
      //await axios.delete(`http://localhost:5000/api/skills/${id}`);
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/skills/${id}`);
      fetchSkills(); // Refresh the list
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  }
}; 

  useEffect(() => { fetchSkills(); }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;
    const targetUserId = id || localStorage.getItem('userId');
    try {
      //await axios.post('http://localhost:5000/api/skills/add', { ...newSkill, userId: targetUserId });
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/skills/add`, { ...newSkill, userId: targetUserId });
      setNewSkill({ name: '', level: 'Beginner', category: 'Technical' });
      fetchSkills(); // Refresh the list immediately
    } catch (err) {
      console.error(err.response?.data);
      alert("Failed to add skill");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-2">My Skill Matrix</h2>
        <p className="text-slate-400 mb-10">Track and update your professional proficiencies.</p>

        {!id && (
          <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-800 shadow-xl mb-10">
            <form onSubmit={handleAddSkill} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Skill Name</label>
                <input 
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  placeholder="e.g. React, Node.js, Project Management"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Proficiency</label>
                <select 
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-600/20">
                Add Skill
              </button>
            </form>
          </div>
        )}

       

        {skills.map((skill) => (
  <div key={skill._id} className="flex justify-between items-center p-4 bg-slate-800/50 border border-slate-700 rounded-2xl mb-3">
    <div>
      <h4 className="text-white font-bold">{skill.name}</h4>
      <p className="text-blue-400 text-sm">{skill.proficiency}</p>
    </div>
    
    <div className="flex gap-2">
      {/* Delete Button */}
      <button 
        onClick={() => deleteSkill(skill._id)}
        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
      >
        Remove
      </button>
    </div>
  </div>
))}

        {/* Skills Display */}
        {loading ? (
          <p>Loading skills...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(skill => (
              <div key={skill._id} className="bg-[#1e293b] p-6 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-white">{skill.name}</h4>
                  <span className={`text-[10px] px-2 py-1 rounded-md font-black uppercase ${
                    skill.level === 'Expert' ? 'bg-green-500/20 text-green-400' : 
                    skill.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {skill.level}
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      skill.level === 'Expert' ? 'w-full bg-green-400' : 
                      skill.level === 'Intermediate' ? 'w-2/3 bg-blue-400' : 'w-1/3 bg-amber-400'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSkills;