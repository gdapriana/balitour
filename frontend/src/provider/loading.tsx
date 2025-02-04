import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType>({
  loading: true,
  setLoading: () => {},
});

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
};

export { LoadingContext, LoadingProvider };
