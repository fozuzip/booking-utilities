import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, login } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-background flex h-screen w-full items-center justify-center">
      <Card className="w-[350px]">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Please sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={username === "" || password === ""}>
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
