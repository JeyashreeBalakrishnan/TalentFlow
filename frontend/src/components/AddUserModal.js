import React, { useState } from 'react';
import axios from 'axios';

const AddUserModal = ({ isOpen, onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'employee', department: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.post('http://localhost:5000/api/auth/create-user', formData);
      //await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/create-user`, formData);
      await axios.post('https://talentflow-1eyr.onrender.com/api/auth/create-user', formData);
      alert("User Created!");
      onUserAdded(); // Refresh the list
      onClose();     // Close the modal
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e293b] p-8 rounded-2xl w-96 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Add New Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700" 
                 placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700" 
                 placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700" 
                 type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required />
          <select 
              className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700"
              onChange={e => setFormData({...formData, role: e.target.value})}
              value={formData.role}
          >
          {/* The 'value' here must be exactly what is in your model's enum */}
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded">Create</button>
            <button type="button" onClick={onClose} className="flex-1 bg-slate-700 text-white py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;