import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import type { Band } from "../../Types/Band";
import BandForm from "../components/BandForm";
import BandList from "../components/BandList";

export default function Index() {
  const [bands, setBands] = useState<Band[]>([]);

  const addBand = (title: string, description: string) => {
    if (!title || !description) {
      Alert.alert("Error", "Please provide both title and description.");
      return;
    }

    const newBand: Band = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      description,
    };

    setBands((currentBands) => [...currentBands, newBand]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Favorite Bands 🎸</Text>
      <TouchableOpacity
        onPress={() => router.push("/todos")}
        style={{
          backgroundColor: "#b91c1c",
          padding: 15,
          margin: 16,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Open Todo List
        </Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <BandForm onAddBand={addBand} />
        <BandList bands={bands} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    paddingTop: 10,
  },
  header: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginVertical: 16,
  },
  content: {
    flex: 1,
  },
});
