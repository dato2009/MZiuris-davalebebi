import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f87171",
        tabBarInactiveTintColor: "#a3a3a3",
        tabBarStyle: {
          backgroundColor: "#202020",
          borderTopColor: "#3f3f46",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: "Todos",
          tabBarIcon: ({ color, size }) => (
            <Feather name="check-square" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
