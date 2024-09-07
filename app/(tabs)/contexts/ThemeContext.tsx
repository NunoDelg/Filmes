import React, { createContext, useState, useContext, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

// Definir o contexto
const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => Promise<void>;
}>({
  theme: "light",
  toggleTheme: async () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("light");

  // Carregar o tema armazenado
  const loadTheme = async () => {
    const storedTheme = await SecureStore.getItemAsync("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  };

  // Alternar entre temas
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await SecureStore.setItemAsync("theme", newTheme);
  };

  // Carregar o tema ao iniciar
  React.useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
