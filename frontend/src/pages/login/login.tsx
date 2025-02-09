import Brand from "@/components/ui/brand.tsx";
import LoginForm from "@/pages/login/components/login-form.tsx";
import {useContext, useState} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {LoadingContext} from "@/provider/loading.tsx";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setToken, authenticated } = useContext(AuthContext)
  const { setLoading } = useContext(LoadingContext)
  const navigate = useNavigate()

  if (authenticated) {
    navigate("/", {replace: true})
  }

  const handleLogin = async () => {
    setLoading(true)
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
        setLoading(false)
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };

  return (
    <div className="absolute w-full flex justify-center items-center bg-primary-foreground top-0 z-[99999] left-0 h-screen">
      <div
        style={{backgroundImage: "url(https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"}}
        className="hidden bg-cover grayscale bg-center md:flex h-full w-1/2 bg-red-300"></div>
      <div className="md:w-1/2 w-full relative h-full p-4 flex justify-center items-center flex-col">
        <Button className="absolute rounded-full top-0 m-4 right-0" asChild>
          <Link to="/">Cancel</Link>
        </Button>
        <Brand headline={import.meta.env.VITE_PUBLIC_APP} direction="col" />
        <p className="text-muted-foreground text-center w-full">Your Ultimate Guide to Bali’s Best Destinations, Traditions, and Stories</p>
        <div className="w-full flex flex-col justify-start items-stretch gap-4 max-w-sm mt-10">
          <LoginForm setPassword={setPassword} setUsername={setUsername} />
          <Button onClick={handleLogin}>Login</Button>
        </div>
        <p className="mt-4 text-muted-foreground">Dont have {import.meta.env.VITE_PUBLIC_APP} account? <Link className="text-primary font-bold" to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;