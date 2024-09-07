import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useThemeContext } from "../(tabs)/contexts/ThemeContext"; 

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeContext(); 

  useEffect(() => {
    const loadSettings = async () => {
      const storedTheme = await SecureStore.getItemAsync("theme");
      if (storedTheme) {
        // Aplicar o tema armazenado
        setTheme(storedTheme);
      }
    };

    loadSettings();
  }, []);

  const setTheme = async (storedTheme: string) => {
    if (storedTheme !== theme) {
      // Define o tema atual com base no armazenado
      await toggleTheme(); 
    }
  };

  return (
    <View style={styles.container}>
      <Text>Current Theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});
