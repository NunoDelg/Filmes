import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FavoritesProvider } from "../(tabs)/contexts/FavoritesContext";
import {
  ThemeProvider,
  useThemeContext,
} from "../(tabs)/contexts/ThemeContext";

// Componente para aplicar o tema
const ThemedTabs: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme === "light" ? "lime" : "black",
        tabBarInactiveTintColor: theme === "light" ? "white" : "black",
        tabBarStyle: {
          backgroundColor: theme === "light" ? "black" : "gray",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: theme === "light" ? "lime" : "cyan",
        },
        tabBarIconStyle: {
          marginBottom: 1,
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="star" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: "MoviesDetails",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="film" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default function TabLayout() {
  return (
    <FavoritesProvider>
      <ThemeProvider>
        <ThemedTabs />
      </ThemeProvider>
    </FavoritesProvider>
  );
}
