import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Changed 'Router' to 'BrowserRouter'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import SkillMatrix from './components/SkillMatrix';
import ManageEmployees from './components/ManageEmployees';
import PerformanceReviews from './components/PerformanceReviews';
import UserSkills from './components/UserSkills';
import Notifications from './components/Notifications';
import PerformanceGoals from './components/PerformanceGoals';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* User Route */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="employee">
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Admin Route */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Profile Route */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/skills" element={<ProtectedRoute requiredRole="admin"><SkillMatrix /></ProtectedRoute>} />
        <Route path="/admin/employees" element={<ProtectedRoute requiredRole="admin"><ManageEmployees /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute requiredRole="admin"><PerformanceReviews /></ProtectedRoute>} />
        <Route path="/skills" element={<ProtectedRoute requiredRole="employee"><UserSkills /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute requiredRole="employee"><PerformanceGoals /></ProtectedRoute>} />
        {/* Catch-all route for 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;