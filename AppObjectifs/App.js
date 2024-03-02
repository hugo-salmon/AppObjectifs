import React, { useState } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, Keyboard, KeyboardAvoidingView, ImageBackground, 
  Modal, TextInput, TouchableOpacity, View
} from 'react-native';
import GoalList from './GoalList';
import GoalInput from './GoalInput';

const App = () => {
  const [sampleGoals, setSampleGoals] = useState([
    "Faire du sport une fois par semaine",
    "Monter en compétences dev",
    "Améliorer mon rythme de sommeil",
    "Faire de la veille technologique",
    "Jouer à la console quotidiennement",
    "Manger équilibré",
    "Passer le permis",
    "Maxer les 2 bases sur CoC",
    "Faire 11 victoires en Fut Champions",
    "Avoir une meuf"
  ]);

  const [isModifyModalVisible, setModifyModalVisible] = useState(false);
  const [modifyText, setModifyText] = useState('');
  const [modifyIndex, setModifyIndex] = useState(null);

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const openModifyModal = (index) => {
    setModifyText(sampleGoals[index]);
    setModifyIndex(index);
    setModifyModalVisible(true);
  };

  const closeModifyModal = () => {
    setModifyText('');
    setModifyIndex(null);
    setModifyModalVisible(false);
  };

  const updateGoal = () => {
    if (modifyIndex !== null) {
      setSampleGoals((goals) => {
        const updatedGoals = [...goals];
        updatedGoals[modifyIndex] = modifyText.trim();
        return updatedGoals;
      });
    }
    closeModifyModal();
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteIndex(null);
    setDeleteModalVisible(false);
  };

  const deleteGoal = () => {
    if (deleteIndex !== null) {
      setSampleGoals((goals) => {
        const updatedGoals = [...goals];
        updatedGoals.splice(deleteIndex, 1);
        return updatedGoals;
      });
    }
    closeDeleteModal();
  };

  const modifyGoal = (index) => {
    openModifyModal(index);
  };

  const addGoal = (newGoal) => {
    setSampleGoals((goals) => [...goals, newGoal]);
    Keyboard.dismiss();
  };

  return (
    <ImageBackground
      source={require('./assets/backgroundimage.avif')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Objectifs</Text>

          <GoalList
            goals={sampleGoals}
            onDelete={(index) => openDeleteModal(index)}
            onModify={modifyGoal}
          />

          <GoalInput onAdd={addGoal} />

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModifyModalVisible}
          >
            <View style={styles.modifyModalContainer}>
              <View style={styles.modifyModalContent}>
                <Text style={styles.modalText}>Modifier l'objectif</Text>
                <Text style={styles.confirmationText}>
                  Souhaitez-vous modifier "{sampleGoals[modifyIndex]}" ?
                </Text>
                <TextInput
                  style={styles.input}
                  value={modifyText}
                  onChangeText={(text) => setModifyText(text)}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={closeModifyModal}
                  >
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.validateButton]}
                    onPress={updateGoal}
                  >
                    <Text style={styles.buttonText}>Modifier</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isDeleteModalVisible}
          >
            <View style={styles.modifyModalContainer}>
              <View style={styles.modifyModalContent}>
                <Text style={styles.modalText}>Supprimer l'objectif</Text>
                <Text style={styles.confirmationText}>
                  Souhaitez-vous supprimer "{sampleGoals[deleteIndex]}" ?
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={closeDeleteModal}
                  >
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.validateButton]}
                    onPress={deleteGoal}
                  >
                    <Text style={styles.buttonText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <StatusBar style="auto" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
  },
  modifyModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modifyModalContent: {
    backgroundColor: 'black',
    padding: 20,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 25
  },
  goalText: {
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  confirmationText: {
    color: 'white',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    color: 'white',
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  validateButton:{
    backgroundColor:'#2ecc71',
  },
  buttonText: {
    color: 'white',
    textAlign:'center',
    width: 80
  },
});

export default App;