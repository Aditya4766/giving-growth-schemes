
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { users, registerUser, loginUser } from '../data/schemes';

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
  isAdmin: false,
});

// Auth context provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    const authenticatedUser = loginUser(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = registerUser(name, email, password);
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Check if user is admin
  const isAdmin = user?.email === 'admin@example.com';

  // Auth context value
  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
