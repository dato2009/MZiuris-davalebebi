import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import type { Todo } from "../../components/TodoCard";

async function fetchTodo(id: string): Promise<Todo> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }

  return response.json();
}

export default function TodoDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Failed to load Todo.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo Details</Text>

      <Text style={styles.text}>ID: {data.id}</Text>
      <Text style={styles.text}>User ID: {data.userId}</Text>
      <Text style={styles.title}>{data.title}</Text>

      <Text
        style={[
          styles.status,
          data.completed ? styles.completed : styles.pending,
        ]}
      >
        {data.completed ? "Completed" : "Not completed"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    padding: 24,
    justifyContent: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },
  text: {
    color: "#aaa",
    fontSize: 17,
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 21,
    marginVertical: 20,
  },
  status: {
    fontSize: 17,
    fontWeight: "bold",
  },
  completed: {
    color: "#4ade80",
  },
  pending: {
    color: "#facc15",
  },
});