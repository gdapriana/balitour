import Brand from "@/components/ui/brand.tsx";
import LoginForm from "@/pages/login/components/login-form.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import {Navigate} from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, authenticated } = useContext(AuthContext)

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.data.token);
        setToken(data.data.token);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };

  useEffect(() => {
    handleLogin().then()
  }, [username, password, handleLogin]);

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="absolute w-full flex justify-center items-center bg-primary-foreground top-0 z-[99999] left-0 h-screen">
      <div className="hidden md:flex h-full w-1/2 bg-red-300"></div>
      <div className="md:w-1/2 w-full h-full p-4 flex justify-center items-center flex-col">
        <Brand headline={import.meta.env.VITE_PUBLIC_APP} direction="col" />
        <p className="text-muted-foreground text-center w-full">Your Ultimate Guide to Bali’s Best Destinations, Traditions, and Stories</p>
        <div className="w-full max-w-sm mt-10">
          <LoginForm setPassword={setPassword} setUsername={setUsername} />
        </div>
      </div>
    </div>
  );
};

export default Login;