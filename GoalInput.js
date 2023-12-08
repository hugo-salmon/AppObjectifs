import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const GoalInput = ({ onAdd }) => {
  const [newGoal, setNewGoal] = useState('');
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
    setNewGoal('');
  };

  const addNewGoal = () => {
    if (newGoal.trim() !== '') {
      onAdd(newGoal.trim());
      closeAddModal();
    }
  };

  const isAddButtonDisabled = newGoal.trim() === '';

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Ajoutez un objectif..."
        placeholderTextColor="white"
        value={newGoal}
        onChangeText={(text) => setNewGoal(text)}
      />
      <TouchableOpacity onPress={openAddModal} disabled={isAddButtonDisabled}>
        <View style={[ styles.button, isAddButtonDisabled && styles.disabledButton]}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Ajouter un objectif
            </Text>
            <Text style={styles.objectifText}>
                  Souhaitez-vous ajouter "{newGoal.trim()}" ?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={closeAddModal}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#2ecc71' }]}
                onPress={addNewGoal}
                disabled={isAddButtonDisabled}
              >
                <Text style={styles.buttonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    borderRadius: 10
  },
  button: {
    borderRadius: 10, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    marginBottom: 10,
    fontSize:20
  },
  objectifText: {
    color: 'white',
    marginBottom: 20,
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});

export default GoalInput;
