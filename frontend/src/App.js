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
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Employee Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="employee">
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/skills" element={
          <ProtectedRoute requiredRole="employee">
            <UserSkills />
          </ProtectedRoute>
        } />
        <Route path="/goals" element={
          <ProtectedRoute requiredRole="employee">
            <PerformanceGoals />
          </ProtectedRoute>
        } />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/skills" element={<ProtectedRoute requiredRole="admin"><SkillMatrix /></ProtectedRoute>} />
        <Route path="/admin/employees" element={<ProtectedRoute requiredRole="admin"><ManageEmployees /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute requiredRole="admin"><PerformanceReviews /></ProtectedRoute>} />
        
        {/* Shared/Dynamic Routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/performance/:id" element={<ProtectedRoute><PerformanceGoals /></ProtectedRoute>} />

        {/* Update these routes in your App.js */}
        <Route path="/skills" element={<ProtectedRoute requiredRole="employee"><UserSkills /></ProtectedRoute>} />
        <Route path="/skills/:id" element={<ProtectedRoute><UserSkills /></ProtectedRoute>} />

        {/* Catch-all route for 404s - THIS IS THE BOUNCER */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;