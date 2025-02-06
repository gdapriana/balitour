import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {User} from "@/lib/types.ts";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  authenticated: false,
  setAuthenticated: () => {},
  token: null,
  setToken: () => {},
})

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    (async function() {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API}/verify`, {
        method: "GET",
        headers: {Authorization: token!},
      })

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        setAuthenticated(true);
      } else {
        setToken(null)
        setUser(null);
        setAuthenticated(false);
      }
    })()
  }, [token]);

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return <AuthContext.Provider value={{ user, setUser, authenticated, setAuthenticated, token, setToken }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
