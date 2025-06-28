import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher' | 'admin') => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'loginStreak' | 'lastLoginDate' | 'enrolledCourses' | 'completedCourses' | 'progress' | 'profileImage'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Update login streak
      const today = new Date().toDateString();
      const lastLogin = new Date(parsedUser.lastLoginDate).toDateString();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastLogin === today) {
        // Same day login, no change to streak
        setUser(parsedUser);
      } else if (lastLogin === yesterday.toDateString()) {
        // Consecutive day login, increment streak
        const updatedUser = {
          ...parsedUser,
          loginStreak: parsedUser.loginStreak + 1,
          lastLoginDate: new Date().toISOString()
        };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Update in users storage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((u: User) => u.id === updatedUser.id);
        if (userIndex !== -1) {
          users[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(users));
        }
      } else {
        // Non-consecutive login, reset streak to 1
        const updatedUser = {
          ...parsedUser,
          loginStreak: 1,
          lastLoginDate: new Date().toISOString()
        };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Update in users storage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((u: User) => u.id === updatedUser.id);
        if (userIndex !== -1) {
          users[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
    }
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'teacher' | 'admin'): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
    
    const foundUser = users.find((u: User) => u.email === email && u.role === role);
    
    if (foundUser && userCredentials[email] === password) {
      // Update login streak
      const today = new Date().toISOString();
      const lastLogin = foundUser.lastLoginDate ? new Date(foundUser.lastLoginDate).toDateString() : '';
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let updatedUser = { ...foundUser };
      
      if (lastLogin === new Date().toDateString()) {
        // Same day login, no change to streak
      } else if (lastLogin === yesterday.toDateString()) {
        // Consecutive day login, increment streak
        updatedUser.loginStreak = (updatedUser.loginStreak || 0) + 1;
      } else {
        // Non-consecutive login, reset streak to 1
        updatedUser.loginStreak = 1;
      }
      
      updatedUser.lastLoginDate = today;
      
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update in users storage
      const userIndex = users.findIndex((u: User) => u.id === updatedUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      return true;
    }
    
    return false;
  };

  const signup = async (userData: Omit<User, 'id' | 'loginStreak' | 'lastLoginDate' | 'enrolledCourses' | 'completedCourses' | 'progress' | 'profileImage'> & { password: string }): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
    
    // Check if email already exists
    if (users.some((u: User) => u.email === userData.email)) {
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      loginStreak: 1,
      lastLoginDate: new Date().toISOString(),
      enrolledCourses: [],
      completedCourses: [],
      progress: {},
      profileImage: null
    };
    
    users.push(newUser);
    userCredentials[userData.email] = userData.password;
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in users storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};