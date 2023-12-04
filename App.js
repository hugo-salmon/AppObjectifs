import { StatusBar } from 'expo-status-bar';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const sampleGoals = [
  "- Faire les courses",
  "- Aller à la salle de sport 3 fois par semaine",
  "- Monter à plus de 5000 m d'altitude",
  "- Acheter mon premier appartement",
  "- Perdre 5 kgs",
  "- Gagner en productivité",
  "- Apprendre un nouveau langage",
  "- Faire une mission en freelance",
  "- Organiser un meetup autour de la tech",
  "- Faire un triathlon"
];

export default function App() {
  const handleButtonPress = () => {
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titre}>Activités disponibles : </Text>
      
      <FlatList
        data={sampleGoals}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item}</Text>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajoutez une activité..."
        />

        <Pressable style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87CEEB',
  },
  button: {
    backgroundColor: 'blue', 
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    marginBottom: 200
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  titre: {
    fontSize: 25,
    color: "white",
    marginBottom: 20
  },
  item: {
    padding: 10,
    fontSize: 15,
    color: "white",
    marginBottom: 0
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    color: "white",
    marginRight: 10,
    marginBottom: 200

  },
});
