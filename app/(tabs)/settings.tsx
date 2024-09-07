import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function SettingsScreen() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadSettings = async () => {
      const storedTheme = await SecureStore.getItemAsync("theme");
      if (storedTheme) setTheme(storedTheme);
    };
    loadSettings();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await SecureStore.setItemAsync("theme", newTheme);
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
