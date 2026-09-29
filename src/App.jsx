import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FitnessProvider } from './context/FitnessContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { MembershipPage } from './pages/MembershipPage';
import { AttendancePage } from './pages/AttendancePage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Protected Route wrapper
const ProtectedLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-pulse-bg flex items-center justify-center text-pulse-lime font-bold">
        Initializing PulseFit Session...
      </div>
    );
  }

  // In prototype mode, allow access or redirect to login if session explicitly logged out
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout>{children}</AppLayout>;
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <FitnessProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Main Authenticated Experience */}
              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedLayout>
                    <DashboardPage />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/membership"
                element={
                  <ProtectedLayout>
                    <MembershipPage />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedLayout>
                    <AttendancePage />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/facilities"
                element={
                  <ProtectedLayout>
                    <FacilitiesPage />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/subscription"
                element={
                  <ProtectedLayout>
                    <SubscriptionPage />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedLayout>
                    <ProfilePage />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedLayout>
                    <AdminDashboardPage />
                  </ProtectedLayout>
                }
              />

              {/* 404 Fallback */}
              <Route
                path="*"
                element={
                  <ProtectedLayout>
                    <NotFoundPage />
                  </ProtectedLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </FitnessProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
