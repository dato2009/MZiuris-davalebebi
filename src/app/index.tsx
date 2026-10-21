import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

import type { Band } from "../../Types/Band";
import BandForm from "../components/BandForm";
import BandList from "../components/BandList";

export default function Index() {
  const [bands, setBands] = useState<Band[]>([]);

  const addBand = (title: string, description: string) => {
    if (!title || !description) {
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
