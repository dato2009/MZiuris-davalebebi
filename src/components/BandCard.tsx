import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Band } from "../../Types/Band";

type BandCardProps = {
  item: Band;
};

export default function BandCard({ item }: BandCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.description}>{item.description}</Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() =>
          Alert.alert(item.title, `Your selected band is ${item.title}!`)
        }
      >
        <Text style={styles.buttonText}>Select Band</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#292929",
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#d4d4d4",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#b91c1c",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
