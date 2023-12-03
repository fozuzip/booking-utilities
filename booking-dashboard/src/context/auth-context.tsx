import { createContext, useContext } from "react";
import useLocalStorage from "@/hooks/use-local-storage";

type User = {
  id: string;
  username: string;
};

interface AuthContext {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
});
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  console.log({ user });

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
