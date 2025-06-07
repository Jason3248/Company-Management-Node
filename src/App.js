import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DepartmentList from './components/department/DepartmentList';
import DepartmentForm from './components/department/DepartmentForm';
import EmployeeList from './components/employee/EmployeeList';
import EmployeeForm from './components/employee/EmployeeForm';
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}


function App() {

    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  return (
     <>
       {!hideNavbar && <Navbar />}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<AuthForm />} />

          {/* Protected Routes */}
          <Route
            path="/departments"
            element={
              <ProtectedRoute>
                <DepartmentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments/create"
            element={
              <ProtectedRoute>
                <DepartmentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments/edit/:id"
            element={
              <ProtectedRoute>
                <DepartmentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/create"
            element={
              <ProtectedRoute>
                <EmployeeForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/edit/:id"
            element={
              <ProtectedRoute>
                <EmployeeForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
     </>
  );
}

export default AppWrapper;
