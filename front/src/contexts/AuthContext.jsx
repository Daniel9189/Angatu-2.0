/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("angatu_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("angatu_token") || null;
  });

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    localStorage.setItem("angatu_user", JSON.stringify(userData));
    localStorage.setItem("angatu_token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("angatu_user");
    localStorage.removeItem("angatu_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
