import { createContext, ReactNode, useEffect, useState } from "react";

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps){
  const [currentTheme, setTheme] = useState<Theme>(() => {
    const theme = localStorage.getItem('theme');

    return (theme ?? 'light') as Theme;
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);

  }, [currentTheme])

  function toggleTheme() {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return(
    <ThemeContext.Provider value={{theme: currentTheme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}