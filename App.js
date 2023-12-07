import React, { useState } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, Keyboard, KeyboardAvoidingView, Alert, ImageBackground } from 'react-native';
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
            setSampleGoals((goals) => {
              const updatedGoals = [...goals];
              updatedGoals.splice(index, 1);
              return updatedGoals;
            });
          },
        },
      ],
    );
  };

  const modifyGoal = (index) => {
    Alert.prompt(
      "Modifier l'objectif",
      'Modifiez votre objectif :',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Modifier',
          onPress: (newGoal) => {
            setSampleGoals((goals) => {
              const updatedGoals = [...goals];
              updatedGoals[index] = newGoal.trim();
              return updatedGoals;
            });
          },
        },
      ],
      'plain-text',
      sampleGoals[index] 
    );
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

          <GoalList goals={sampleGoals} onDelete={deleteGoal} onModify={modifyGoal}/>

          <GoalInput onAdd={addGoal} />

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
    fontSize: 25,
    color: 'white',
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
  },
});

export default App;
