import React from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage.jsx';
import ProtectedRoute from './components/ProtectuedRoutes.js';  

function App() {
  return (
    <>
      <div className="min-w-screen">
        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              zIndex: 9999,
            },
          }}
        />

        {/* Routes */}
        <Routes>
          {/* Protected Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegistrationPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
