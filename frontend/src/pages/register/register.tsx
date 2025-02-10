import Brand from "@/components/ui/brand.tsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/auth.tsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import RegisterForm from "@/pages/register/components/register-form.tsx";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, name }),
      });
      if (response.ok) {
        navigate("/login", { replace: true });
      } else {
        console.error("Register failed");
      }
    } catch (error) {
      console.error("An error occurred during register", error);
    }
  };

  useEffect(() => {
    handleRegister().then();
  }, [username, password, handleRegister]);

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="absolute w-full flex-row-reverse flex justify-center items-center bg-primary-foreground top-0 z-[99999] left-0 h-screen">
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
        className="hidden bg-cover grayscale bg-center md:flex h-full w-1/2 bg-red-300"
      ></div>
      <div className="md:w-1/2 w-full relative h-full p-4 flex justify-center items-center flex-col">
        <Button className="absolute top-0 m-4 right-0 rounded-full" asChild>
          <Link to="/">Cancel</Link>
        </Button>
        <Brand headline={import.meta.env.VITE_PUBLIC_APP} direction="col" />
        <p className="text-muted-foreground text-center w-full">
          Your Ultimate Guide to Bali’s Best Destinations, Traditions, and Stories
        </p>
        <div className="w-full max-w-sm mt-10">
          <RegisterForm setPassword={setPassword} setUsername={setUsername} setName={setName} />
        </div>
        <p className="mt-4 text-muted-foreground">
          Already have {import.meta.env.VITE_PUBLIC_APP} account?{" "}
          <Link className="text-primary font-bold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
