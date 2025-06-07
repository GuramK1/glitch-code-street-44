
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
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

  useEffect(() => {
    // Check for existing auth on mount
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userSession = { email: foundUser.email, username: foundUser.username };
      localStorage.setItem('authUser', JSON.stringify(userSession));
      setUser(userSession);
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false; // User already exists
    }

    const newUser = { email, username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after registration
    const userSession = { email, username };
    localStorage.setItem('authUser', JSON.stringify(userSession));
    setUser(userSession);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
