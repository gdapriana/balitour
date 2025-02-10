import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ScrollContextType {
  scrolled: boolean;
  setScrolled: Dispatch<SetStateAction<boolean>>;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const ScrollContext = createContext<ScrollContextType>({
  scrolled: true,
  setScrolled: () => {},
  value: 0,
  setValue: () => {},
});

const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  return <ScrollContext.Provider value={{ scrolled, setScrolled, value, setValue }}>{children}</ScrollContext.Provider>;
};

export { ScrollContext, ScrollProvider };
