import React from 'react';

const AddGoalModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Blur Overlay */}
      <div 
        className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#1e293b] border border-slate-800 w-full max-w-md rounded-[2rem] shadow-2xl p-8 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-white">New Objective</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl">&times;</button>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Goal Title</label>
            <input 
              type="text" 
              placeholder="e.g. Master TypeScript"
              className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Target Date</label>
            <input 
              type="date" 
              className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Priority</label>
            <select className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition appearance-none">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-95"
          >
            Create Goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;