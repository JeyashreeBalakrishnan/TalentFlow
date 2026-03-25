import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // FIXED: Added import

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const userId = res.data.user?._id || res.data._id || res.data.user?.id;
      if(userId){
      
      // 1. Save EVERYTHING - You were missing 'userId'
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.user?.role || res.data.role);
      localStorage.setItem('userName', res.data.user?.name || res.data.name);
      localStorage.setItem('userId', userId); // <--- ADD THIS LINE!

      console.log("Login Success. ID saved:", userId);
      const role = res.data.user?.role || res.data.role;
      const destination = (role === 'admin') ? '/admin' : '/dashboard';
      setTimeout(() => {
        navigate(destination);
      }, 100);
       } else {
         console.error("CRITICAL: No ID found in backend response. Check Network -> Response tab.");
         alert("System error: User profile incomplete.");
       }
     
      // 2. Immediate redirect (Remove the timeouts, they cause the 'blinking')
    
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-900">
      {/* LEFT SIDE: Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12 text-white">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">TalentFlow</span>
          </div>
        </div>
        
        <div className="max-w-md">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Elevate your <span className="text-blue-500">workforce</span> intelligence.
          </h1>
          <p className="text-slate-400 text-lg">
            The all-in-one performance tracking system designed for high-growth teams.
          </p>
        </div>

        <div className="text-slate-500 text-sm">
          © 2026 TalentFlow Systems Inc.
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Sign in</h2>
            <p className="text-slate-500 mt-2">Enter your corporate credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Work Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs text-blue-600 hover:font-bold transition-all">Forgot password?</button>
              </div>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] shadow-lg ${
                loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-black hover:shadow-xl'
              }`}
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-100 text-center text-sm">
            <span className="text-slate-500">New to the platform?</span>
            <button type="button" className="ml-2 text-blue-600 font-bold hover:underline">Contact Administrator</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;