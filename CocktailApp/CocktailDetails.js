import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const CocktailDetails = ({ route }) => {
  const { idDrink } = route.params;
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
        const data = await response.json();
        if (data.drinks && data.drinks.length > 0) {
          setCocktailDetails(data.drinks[0]);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching cocktail details:', error);
        setError(true);
        setLoading(false);
      }
    };
    
    fetchCocktailDetails();
  }, [idDrink]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching cocktail details. Please try again later.</Text>;
  }

  if (!cocktailDetails) {
    return <Text>No details available for this cocktail.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cocktailDetails.strDrink}</Text>
      <Image source={{ uri: cocktailDetails.strDrinkThumb }} style={styles.thumbnail} />
      <Text style={styles.subtitle}>Cocktail Type: {cocktailDetails.strAlcoholic}</Text>
      <Text style={styles.subtitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>
        {renderIngredients(cocktailDetails)}
      </View>
    </View>
  );
};

const renderIngredients = (cocktailDetails) => {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktailDetails[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(
        <Text key={i} style={styles.ingredient}>
          {ingredient.trim()}
        </Text>
      );
    }
  }
  return ingredients;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  thumbnail: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  ingredientsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default CocktailDetails;
