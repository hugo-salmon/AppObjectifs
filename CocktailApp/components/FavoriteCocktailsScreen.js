import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FavoriteCocktails = ({ favorites, toggleFavorite }) => {
    const navigation = useNavigation();
  
    const navigateToCocktailDetails = (idDrink) => {
      navigation.navigate('CocktailDetails', { idDrink });
    };
  
    const navigateToCocktailsList = () => {
      navigation.navigate('CocktailApp');
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.cocktailItem}>
        <TouchableOpacity onPress={() => navigateToCocktailDetails(item.idDrink)} style={styles.detailTouchable}>
          <Image source={{ uri: item.strDrinkThumb }} style={styles.thumbnail} />
          <Text style={styles.cocktailName}>{item.strDrink}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>❌</Text>
        </TouchableOpacity>
      </View>
    );
  
    const content = favorites.length > 0 ? (
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
        style={styles.flatList}
      />
    ) : (
      <View style={styles.noFavoritesContainer}>
        <Text style={styles.noFavoritesText}>Il n'y a pas de cocktail en favori.</Text>
        <TouchableOpacity onPress={navigateToCocktailsList}>
          <Text style={styles.goToCocktailsText}>Aller voir la liste des cocktails</Text>
        </TouchableOpacity>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cocktails Favoris</Text>
        {content}
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    paddingTop: 20, 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#333', 
    marginVertical: 20, 
  },
  cocktailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, 
    paddingHorizontal: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10, 
    marginVertical: 5, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  detailTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60, 
    height: 60,
    borderRadius: 30, 
    marginRight: 15,
  },
  cocktailName: {
    fontSize: 18,
    fontWeight: '500', 
    color: '#444', 
  },
  deleteButton: {
    padding: 8, 
    backgroundColor: 'rgba(255, 0, 0, 0.1)', 
    borderRadius: 15, 
  },
  deleteButtonText: {
    fontSize: 18, 
    color: '#ff0000', 
  },
  flatList: {
    width: '100%',
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, 
  },
  noFavoritesText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15, 
  },
  goToCocktailsText: {
    fontSize: 18,
    color: '#007bff', 
    textDecorationLine: 'underline',
  },
});

export default FavoriteCocktails;
