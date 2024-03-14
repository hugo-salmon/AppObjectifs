import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const RandomCocktail = () => {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  const fetchRandomCocktail = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await response.json();
      if (data.drinks && data.drinks.length > 0) {
        setCocktail(data.drinks[0]);
      } else {
        setError(true);
        console.error("Aucun cocktail n'a été trouvé.");
      }
    } catch (error) {
      setError(true);
      console.error("Erreur lors de la récupération d'un cocktail aléatoire:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (error || !cocktail) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Impossible de charger un cocktail aléatoire. Veuillez réessayer.</Text>
        <TouchableOpacity style={styles.button} onPress={fetchRandomCocktail}>
          <Text style={styles.buttonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cocktail.strDrink}</Text>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.thumbnail} />
      <Text style={styles.details}>Catégorie: {cocktail.strCategory}</Text>
      <Text style={styles.details}>Type: {cocktail.strAlcoholic}</Text>
      <TouchableOpacity style={styles.button} onPress={fetchRandomCocktail}>
        <Text style={styles.buttonText}>Nouveau cocktail aléatoire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff', 
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#343a40', 
    marginBottom: 25, 
    textAlign: 'center',
  },
  thumbnail: {
    width: 320, 
    height: 320,
    borderRadius: 160, 
    marginBottom: 25,
    borderWidth: 5, 
    borderColor: '#007bff', 
  },
  details: {
    fontSize: 20, 
    color: '#495057', 
    marginBottom: 10,
    textAlign: 'center', 
  },
  button: {
    marginTop: 30, 
    backgroundColor: '#28a745', 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    borderRadius: 25, 
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18, 
    fontWeight: 'bold', 
  },
});

export default RandomCocktail;
