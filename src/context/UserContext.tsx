import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  email: string;
  role: 'admin' | 'member';
} | null;

type UserContextType = {
  user: User;
  login: (email: string, role: 'admin' | 'member') => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = (email: string, role: 'admin' | 'member') => {
    setUser({ email, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}