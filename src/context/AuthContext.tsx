import { useState, useContext, createContext, type ReactNode } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

interface AuthContextType {
  isLogged: boolean;
  handleLogin: () => void;
  userName: string;
  handleUserName: (name: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializa recuperando os valores salvos no localStorage (evita deslogar no F5 ou troca de URL)
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return localStorage.getItem("@ecommerce:isLogged") === "true";
  });

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem("@ecommerce:userName") || "";
  });

  const navigate = useNavigate();

  function handleLogin() {
    setIsLogged(true);
    localStorage.setItem("@ecommerce:isLogged", "true");
  }

  function handleUserName(name: string) {
    setUserName(name);
    localStorage.setItem("@ecommerce:userName", name);
  }

  async function handleLogout() {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
    } finally {
      // Limpa os estados e o localStorage
      setIsLogged(false);
      setUserName("");
      localStorage.removeItem("@ecommerce:isLogged");
      localStorage.removeItem("@ecommerce:userName");
      navigate("/");
    }
  }

  return (
    <AuthContext.Provider
      value={{ isLogged, handleLogin, userName, handleUserName, handleLogout }}
    >
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
