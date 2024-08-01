// AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface User {
  username: string;
  // Ajoutez d'autres propriétés utilisateur selon vos besoins
}

interface AuthContextType {
  user: any;
  login: (userData: User) => void;
  logout: () => void;
  isAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Vous pouvez vérifier l'état d'authentification ici
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuth = () => {
    let savedUser : any = localStorage.getItem("user");
    savedUser = JSON.parse(savedUser)
    //setUser(savedUser)
    return savedUser?.token !== undefined && savedUser?.token !== null && savedUser?.token !== "";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
