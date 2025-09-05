import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'academic' | 'guest';
  walletBalance?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateWallet: (amount: number) => void;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateWallet = (amount: number) => {
    if (user && user.role === 'student') {
      setUser(prev => prev ? { ...prev, walletBalance: (prev.walletBalance || 0) + amount } : null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateWallet,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};