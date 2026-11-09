import React from "react";
import { Stack } from "expo-router";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="todo/[id]"
          options={{
            title: "Todo Details",
            headerStyle: { backgroundColor: "#171717" },
            headerTintColor: "#fff",
            headerTitleStyle: { color: "#fff" },
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}