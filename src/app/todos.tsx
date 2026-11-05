import React, { useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useQuery } from "@tanstack/react-query";

import type { Todo } from "../components/TodoCard";
import TodoCard from "../components/TodoCard";

async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json() as Promise<Todo[]>;
}

export default function TodosScreen() {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  function openModal(todo: Todo) {
    setSelectedTodo({ ...todo });
    setModalVisible(true);
  }

  // Todo-ს განახლება
  function updateTodo() {
    if (!selectedTodo) return;

    setTodoList((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === selectedTodo.id ? selectedTodo : todo,
      ),
    );

    setModalVisible(false);
    setSelectedTodo(null);
  }

  React.useEffect(() => {
    if (todos) {
      setTodoList(todos);
    }
  }, [todos]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Failed to load todos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoCard item={item} onPress={() => openModal(item)} />
        )}
        contentContainerStyle={styles.list}
      />

      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Todo</Text>

            <TextInput
              style={styles.input}
              value={selectedTodo?.title ?? ""}
              onChangeText={(text) =>
                setSelectedTodo((previous) =>
                  previous ? { ...previous, title: text } : null,
                )
              }
              placeholder="Todo title"
              placeholderTextColor="#999"
            />

            <View style={styles.switchRow}>
              <Text style={styles.text}>Completed</Text>

              <Switch
                value={selectedTodo?.completed ?? false}
                onValueChange={(value) =>
                  setSelectedTodo((previous) =>
                    previous ? { ...previous, completed: value } : null,
                  )
                }
              />
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={updateTodo}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    paddingTop: 20,
  },
  header: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    marginTop: 12,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#292929",
    width: "100%",
    padding: 22,
    borderRadius: 15,
  },
  modalTitle: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#404040",
    color: "white",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#555",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
