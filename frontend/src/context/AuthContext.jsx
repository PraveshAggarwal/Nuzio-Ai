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
  const [isNewUser, setIsNewUser] = useState(() => {
    return localStorage.getItem('nuzio_is_new_user') === 'true';
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

  // Sign up with Name, Email and Password (NEW USER FLOW)
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

      if (data.token) {
        localStorage.setItem('nuzio_token', data.token);
      }
      
      // Mark as NEW user -> triggers Language -> Preferences onboarding
      setIsNewUser(true);
      localStorage.setItem('nuzio_is_new_user', 'true');
      localStorage.setItem('nuzio_lang_selected', 'false');
      localStorage.setItem('nuzio_niches_completed', 'false');

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

  // Log in with Email and Password (EXISTING USER FLOW)
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

      if (data.token) {
        localStorage.setItem('nuzio_token', data.token);
      }

      // Mark as EXISTING user -> bypasses onboarding and goes directly to Main Feed
      setIsNewUser(false);
      localStorage.setItem('nuzio_is_new_user', 'false');
      localStorage.setItem('nuzio_lang_selected', 'true');
      localStorage.setItem('nuzio_niches_completed', 'true');

      if (data.user.language) {
        localStorage.setItem('nuzio_lang', data.user.language);
      }
      if (data.user.niches && data.user.niches.length > 0) {
        localStorage.setItem('nuzio_selected_niches', JSON.stringify(data.user.niches));
      }

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
      const token = localStorage.getItem('nuzio_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BACKEND_URL}/api/auth/preferences`, {
        method: 'PUT',
        headers,
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
    setIsNewUser(false);
    localStorage.removeItem('nuzio_token');
    localStorage.removeItem('nuzio_user');
    localStorage.removeItem('nuzio_is_new_user');
    localStorage.removeItem('nuzio_lang_selected');
    localStorage.removeItem('nuzio_niches_completed');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isNewUser,
        setIsNewUser,
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
