
import React from 'react';
import { Formik } from 'formik';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type BandFormProps = {
  onAddBand: (title: string, description: string) => void;
};

export default function BandForm({ onAddBand }: BandFormProps) {
  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      onSubmit={(values, { resetForm }) => {
        onAddBand(
          values.title.trim(),
          values.description.trim()
        );
        resetForm();
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.form}>
          <Text style={styles.heading}>Add a New Band 🎸</Text>

          <TextInput
            style={styles.input}
            placeholder="Band name"
            placeholderTextColor="#999"
            value={values.title}
            onChangeText={handleChange('title')}
          />

          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Favorite songs"
            placeholderTextColor="#999"
            value={values.description}
            onChangeText={handleChange('description')}
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Add Band</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#292929',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 18,
  },
  heading: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#fff',
    color: '#171717',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  multiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#b91c1c',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
