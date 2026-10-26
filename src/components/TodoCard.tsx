import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodoCardProps = {
  item: Todo;
};

export default function TodoCard({ item }: TodoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.id}>Todo #{item.id}</Text>

      <Text style={styles.title}>{item.title}</Text>

      <Text
        style={[
          styles.status,
          item.completed ? styles.completed : styles.pending,
        ]}
      >
        {item.completed ? 'Completed ' : 'Not completed'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#292929',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  id: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  completed: {
    color: '#4ade80',
  },
  pending: {
    color: '#facc15',
  },
});