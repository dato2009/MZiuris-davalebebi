import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

import TodoCard, { Todo } from '../components/TodoCard';

async function fetchTodos() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json();
}

export default function TodosScreen() {
  const {
    data: todos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b91c1c" />
        <Text style={styles.message}>Loading todos...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>
          Failed to load todos.
        </Text>
        <Text style={styles.retry} onPress={() => refetch()}>
          Tap here to try again
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    paddingTop: 20,
  },
  header: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    backgroundColor: '#171717',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  retry: {
    color: '#f87171',
    marginTop: 12,
    fontSize: 16,
  },
});
