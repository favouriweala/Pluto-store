import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  adminLogin: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'customer@example.com': {
    password: 'password123',
    user: {
      id: '1',
      email: 'customer@example.com',
      name: 'John Doe',
      isAdmin: false,
    },
  },
  'admin@plutostore.com': {
    password: 'admin123',
    user: {
      id: '2',
      email: 'admin@plutostore.com',
      name: 'Admin User',
      isAdmin: true,
    },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = MOCK_USERS[email];
        if (mockUser && mockUser.password === password && !mockUser.user.isAdmin) {
          setUser(mockUser.user);
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const register = async (email: string, _password: string, name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MOCK_USERS[email]) {
          reject(new Error('User already exists'));
        } else {
          const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            isAdmin: false,
          };
          setUser(newUser);
          resolve();
        }
      }, 500);
    });
  };

  const adminLogin = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = MOCK_USERS[email];
        if (mockUser && mockUser.password === password && mockUser.user.isAdmin) {
          setUser(mockUser.user);
          resolve();
        } else {
          reject(new Error('Invalid admin credentials'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isAdmin: user?.isAdmin ?? false,
        login,
        register,
        logout,
        updateUser,
        adminLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
