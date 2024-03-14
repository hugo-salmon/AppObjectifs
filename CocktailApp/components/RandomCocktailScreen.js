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
    backgroundColor: '#F7F7F7',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 20,
    textAlign: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
    borderRadius: 20, 
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  details: {
    fontSize: 18,
    color: '#4A4A4A',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20, 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default RandomCocktail;
