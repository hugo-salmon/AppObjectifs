import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Alert, Keyboard } from 'react-native';

const GoalInput = ({ onAdd }) => {
  const [newGoal, setNewGoal] = useState('');

  const showAlert = () => {
    Keyboard.dismiss();
    Alert.alert(
      "Confirmer l'ajout",
      `Voulez-vous vraiment ajouter l'objectif "${newGoal.trim()}" ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
          onPress: () => {
            setNewGoal('');
          },
        },
        {
          text: 'Ajouter',
          onPress: handleAdd,
          disabled: newGoal.trim() === '', // Désactiver le bouton si l'input est vide
        },
      ],
    );
  };

  const handleAdd = () => {
    if (newGoal.trim() !== '') {
      onAdd(`- ${newGoal.trim()}`);
      setNewGoal('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Ajoutez un objectif..."
        placeholderTextColor="white"
        value={newGoal}
        onChangeText={(text) => setNewGoal(text)}
      />
      <TouchableHighlight
        underlayColor="#2674c2"
        onPress={showAlert}
        style={[styles.button, newGoal.trim() === '' && styles.disabledButton]}
        disabled={newGoal.trim() === ''}
      >
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'white',
    marginRight: 10,
    marginLeft: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#3498db',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GoalInput;
