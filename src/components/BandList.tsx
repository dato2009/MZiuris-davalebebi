import { FlatList, StyleSheet, Text } from "react-native";
import type { Band } from "../../Types/Band";
import BandCard from "./BandCard";

type BandListProps = {
  bands: Band[];
};

export default function BandList({ bands }: BandListProps) {
  return (
    <FlatList
      data={bands}
      renderItem={({ item }) => <BandCard item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <Text style={styles.empty}>
          No bands yet. Add your first band above!
        </Text>
      }
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  empty: {
    color: "#aaa",
    textAlign: "center",
    fontSize: 15,
    marginTop: 24,
  },
});
