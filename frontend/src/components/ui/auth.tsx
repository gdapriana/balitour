import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading.tsx";

const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState<"loading" | "auth" | "unauth">("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    (async function () {
      try {
        const response = await fetch(`${import.meta.env.VITE_PUBLIC_API}/verify`, {
          headers: { Authorization: token! },
        });
        if (response.ok) {
          setAuthenticated("auth");
        } else {
          setAuthenticated("unauth");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [authenticated, navigate]);

  if (authenticated === "loading") return <Loading />;
  return authenticated === "auth" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
