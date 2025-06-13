import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './layouts/MainLayout';
import { DevicesPage } from './pages/DevicesPage';
import { ErrorLogsPage } from './pages/ErrorLogsPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<DevicesPage />} />
              <Route path="error-logs" element={<ErrorLogsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;