import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { memberService } from '../services/memberService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await memberService.getProfile();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to load user session', err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const { user: loggedInUser } = await authService.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const demoLogin = async () => {
    return login('narasimha@example.com', 'demo123');
  };

  const logout = async () => {
    await authService.logout();
    // Reset session
    setUser(null);
  };

  const updateCurrentUser = async (updatedFields) => {
    const updated = await memberService.updateProfile(updatedFields);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        demoLogin,
        logout,
        updateCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
