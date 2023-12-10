import { createContext, useContext } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import * as api from "@/services/api";

type User = {
  id: string;
  username: string;
};

interface AuthContext {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  login: async () => {},
  logout: async () => {},
});
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const login = async (username: string, password: string) => {
    const { user } = await api.login(username, password);
    setUser({ username: user.username, id: user.id });
  };
  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
