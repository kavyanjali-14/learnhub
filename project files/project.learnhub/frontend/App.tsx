import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

// Student Components
import StudentLayout from './components/Student/StudentLayout';
import StudentDashboard from './components/Student/Dashboard';
import StudentCourses from './components/Student/Courses';
import StudentWorkshops from './components/Student/Workshops';
import StudentDiscussions from './components/Student/Discussions';
import SkillAssessment from './components/Student/Assessment';
import ProgressTracking from './components/Student/Progress';
import StudentProfile from './components/Student/Profile';

// Teacher Components
import TeacherLayout from './components/Teacher/TeacherLayout';
import TeacherDashboard from './components/Teacher/Dashboard';
import TeacherCommunications from './components/Teacher/Communications';
import TeacherProfile from './components/Teacher/Profile';

// Admin Components
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/Dashboard';
import UserManagement from './components/Admin/UserManagement';
import AdminProfile from './components/Admin/Profile';
import DataViewer from './components/Admin/DataViewer';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header />
              <Home />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student Routes */}
          <Route path="/student/*" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="workshops" element={<StudentWorkshops />} />
            <Route path="discussions" element={<StudentDiscussions />} />
            <Route path="assessment" element={<SkillAssessment />} />
            <Route path="progress" element={<ProgressTracking />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher/*" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherLayout />
            </ProtectedRoute>
          }>
            <Route index element={<TeacherDashboard />} />
            <Route path="courses" element={<div className="p-8 text-center text-gray-600">Course Management - Coming Soon</div>} />
            <Route path="communications" element={<TeacherCommunications />} />
            <Route path="profile" element={<TeacherProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="data" element={<DataViewer />} />
            <Route path="analytics" element={<div className="p-8 text-center text-gray-600">Analytics - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-8 text-center text-gray-600">Settings - Coming Soon</div>} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* Redirect based on user role */}
          <Route path="/dashboard" element={
            user ? (
              <Navigate to={`/${user.role}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;