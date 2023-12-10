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
import { getErrorMessage } from "@/lib/utils";
import { AxiosError } from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AxiosError | null>(null);

  const { user, login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      setError(error as AxiosError);
    }
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
                  id="username"
                  name="username"
                  required
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="flex flex-col items-end">
              <Button type="submit">Sign In</Button>
              {error && (
                <p className="mt-1 text-xs text-rose-300">
                  {getErrorMessage(error)}
                </p>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
