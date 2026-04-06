import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserModal from './AddUserModal';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
       // const res = await axios.get('http://localhost:5000/api/auth/users');
        //const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users`);
        const res = await axios.get('https://talentflow-1eyr.onrender.com/api/auth/users');
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleLogout = () => {
  // Clear all session data
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  
  // Send the user back to the login page
  navigate('/login');
};

  return (
    <div className="min-h-screen bg-[#0f172a] p-8 text-slate-200">
      <div className="flex justify-between items-center mb-12">
      <div>
      <h1 className="text-4xl font-black text-white mb-8 italic tracking-tight">Admin Console</h1>
      <p className="text-slate-400 text-sm mt-1">Manage system access and review performance.</p>
      </div>
      <button 
        onClick={handleLogout}
        className="bg-slate-800 hover:bg-red-900/40 text-red-400 border border-slate-700 px-4 py-2 rounded-xl font-bold transition-all text-sm"
      >
        Logout
      </button>
      </div>
      <button 
         onClick={() => setIsModalOpen(true)}
         className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 mb-12"
      >
        + Add New Employee
      </button>
      
      {/* 1. FIXED ALIGNMENT: Changed grid-cols-1 to a responsive 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => ( 
          <div key={emp._id} className="bg-[#1e293b] p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{emp.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{emp.email}</p>
            </div>

            {/* 2. REMOVED ADMIN BUTTONS: Only show buttons if the user is NOT an admin */}
            {emp.role !== 'admin' && emp.email !== 'admin@talentflow.com' ? (
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate(`/performance/${emp._id}`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded-xl transition"
                >
                  View Performance
                </button>
                <button 
                  onClick={() => navigate(`/skills/${emp._id}`)} 
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2 rounded-xl transition"
                >
                  View Skills
                </button>
              </div>
            ) : (
              /* Visual indicator for the Admin card so it doesn't look empty */
              <span className="text-[10px] bg-slate-800 text-slate-500 px-3 py-1 rounded-full uppercase font-black self-start">
                System Administrator
              </span>
            )}
          </div>
        ))}
      </div>

      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onUserAdded={() => window.location.reload()} 
      />
    </div>
  );
};

export default AdminDashboard;