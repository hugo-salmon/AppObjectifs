import React, { useState } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, Keyboard, KeyboardAvoidingView, Alert, ImageBackground } from 'react-native';
import GoalList from './GoalList';
import GoalInput from './GoalInput';

const App = () => {
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
            setSampleGoals((prevGoals) => {
              const updatedGoals = [...prevGoals];
              updatedGoals.splice(index, 1);
              return updatedGoals;
            });
          },
        },
      ],
    );
  };

  const addGoal = (newGoal) => {
    setSampleGoals((prevGoals) => [...prevGoals, newGoal]);
    Keyboard.dismiss();
  };

  return (
    <ImageBackground
      source={require('./assets/backgroundimage.avif')} // Remplacez 'background.jpg' par le nom de votre image
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Objectifs de la semaine :</Text>

          <GoalList goals={sampleGoals} onDelete={deleteGoal} />

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
