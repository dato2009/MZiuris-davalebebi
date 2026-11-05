import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  item: Todo;
  onPress: () => void;
};

export default function TodoCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={item.completed ? styles.done : styles.pending}>
          {item.completed ? "Completed ✓" : "Not completed"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#292929",
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
  },
  title: {
    color: "white",
    fontSize: 17,
    marginBottom: 10,
  },
  done: {
    color: "#4ade80",
  },
  pending: {
    color: "#facc15",
  },
});
