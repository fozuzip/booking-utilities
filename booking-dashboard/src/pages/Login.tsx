import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { Button } from "@/components/ui/button";

function Login() {
  const { user, login } = useAuth();

  const handleLogin = () => {
    login({
      id: "1",
      username: "John Doe",
    });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default Login;
