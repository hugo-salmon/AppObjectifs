import React, { useState } from 'react';
import { StatusBar, Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, 
  Keyboard, KeyboardAvoidingView, Platform 
} from 'react-native';

export default function App() {
  const [sampleGoals, setSampleGoals] = useState([
    "- Faire les courses",
    "- Aller à la salle de sport 3 fois par semaine",
    "- Monter à plus de 5000 m d'altitude",
    "- Acheter mon premier appartement",
    "- Perdre 5 kgs",
    "- Gagner en productivité",
    "- Apprendre un nouveau langage",
    "- Faire une mission en freelance",
    "- Organiser un meetup autour de la tech",
    "- Faire un triathlon",
  ]);

  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (newGoal !== '') {
      const updatedGoals = [...sampleGoals, `- ${newGoal.trim()}`];
      setSampleGoals(updatedGoals);
      setNewGoal('');
      Keyboard.dismiss();
    }
  };

  const deleteGoal = (index) => {
    Alert.alert(
      "Supprimer l'objectif",
      'Voulez-vous vraiment supprimer cet objectif ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            const updatedGoals = [...sampleGoals];
            updatedGoals.splice(index, 1);
            setSampleGoals(updatedGoals);
          },
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Objectifs de la semaine :</Text>

        <FlatList
          data={sampleGoals}
          renderItem={({ item, index }) => (
            <View style={styles.goalContainer}>
              <Text style={styles.item}>{item}</Text>
              <Pressable onPress={() => deleteGoal(index)}>
                <Text style={styles.deleteButton}>❌</Text>
              </Pressable>
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ajoutez un objectif..."
            value={newGoal}
            onChangeText={(text) => setNewGoal(text)}
          />

          <Pressable style={styles.button} onPress={addGoal}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </Pressable>
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    padding: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 25,
    color: 'white',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    fontSize: 15,
    color: 'white',
  },
  deleteButton: {
    fontSize: 20,
    marginLeft: 10,
    color: 'red',
  },
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
    marginLeft: 10
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
