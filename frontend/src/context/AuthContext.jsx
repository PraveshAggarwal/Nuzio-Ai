import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nuzio_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nuzio_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nuzio_user');
    }
  }, [user]);

  // Sign up with Name, Email and Password (saved as-is in Database)
  const signupWithEmailAndPassword = async ({ name, email, password }) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.removeItem('nuzio_niches_completed');
      setUser(data.user);
      return data;
    } catch (err) {
      console.error('Signup Error:', err);
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Log in with Email and Password
  const loginWithEmailAndPassword = async ({ email, password }) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.removeItem('nuzio_niches_completed');
      setUser(data.user);
      return data;
    } catch (err) {
      console.error('Login Error:', err);
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Save preferences (niches, language) in database
  const updateUserPreferences = async ({ niches, language }) => {
    if (!user) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id || user._id,
          email: user.email,
          niches: niches || user.niches,
          language: language || user.language,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success && data.user) {
        setUser((prev) => ({ ...prev, ...data.user }));
        return data.user;
      }
    } catch (err) {
      console.error('Failed to sync user preferences to DB:', err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nuzio_user');
    localStorage.removeItem('nuzio_niches_completed');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        setAuthError,
        signupWithEmailAndPassword,
        loginWithEmailAndPassword,
        updateUserPreferences,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
