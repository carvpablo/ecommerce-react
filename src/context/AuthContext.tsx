import { useState, useContext, createContext, type ReactNode } from "react";

interface AuthContextType {
  isLogged: boolean;
  handleLogin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);

  function handleLogin() {
    setIsLogged((prev) => !prev);
  }

  return (
    <AuthContext.Provider value={{ isLogged, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
