import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";

interface AuthContextType {
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType>({
  username: null,
  setUsername: () => {},
  authenticated: false,
  setAuthenticated: () => {},
  token: null,
  setToken: () => {},
})

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [username, setUsername] = useState<string | null>(null);
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
        console.log({data})
        setUsername(data.data.username);
        setAuthenticated(true);
      } else {
        setToken(null)
        setUsername(null);
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

  return <AuthContext.Provider value={{ username, setUsername, authenticated, setAuthenticated, token, setToken }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
