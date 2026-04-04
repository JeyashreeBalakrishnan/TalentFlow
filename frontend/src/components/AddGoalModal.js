// 1. Add useEffect to the imports
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const AddGoalModal = ({ isOpen, onClose, onGoalAdded, editingGoal }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });

  // 2. This "watches" for changes. If editingGoal exists, fill the form.
  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title,
        description: editingGoal.description || '',
        status: editingGoal.status || 'Pending'
      });
    } else {
      // Clear form if we are adding a new goal
      setFormData({ title: '', description: '', status: 'Pending' });
    }
  }, [editingGoal, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Get the logged-in user's ID
  const userId = localStorage.getItem('userId'); 

  // 2. Combine form data with the userId
  const goalData = {
    title: formData.title,
    description: formData.description,
    status: formData.status || 'In Progress',
    userId: userId // THIS IS THE MISSING KEY
  };

  try {
    //const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/goals/add`, goalData);
    //const res = await axios.post('http://localhost:5000/api/goals/add', goalData);
    // Add this line
     const res = await axios.post('https://talentflow-1eyr.onrender.com/api/goals/add', newGoal);
    if (res.status === 201) {
      alert("Goal Created!");
      onGoalAdded();
      onClose(); // Close modal
    }
  } catch (err) {
    console.error(err);
    alert("Failed to save goal: " + (err.response?.data?.message || "Server Error"));
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-[#1e293b] border border-slate-800 w-full max-w-md rounded-[2rem] shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          {/* 5. Dynamic Title */}
          <h3 className="text-2xl font-black text-white">
            {editingGoal ? 'Edit Objective' : 'New Objective'}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl">&times;</button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Goal Title</label>
            <input 
              name="title"
              type="text" 
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Master TypeScript"
              className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description / Date</label>
            <input 
              name="description"
              type="text" 
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief details about this goal"
              className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Priority Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition appearance-none"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-95"
          >
            {/* 6. Dynamic Button Text */}
            {editingGoal ? 'Update Goal' : 'Create Goal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;