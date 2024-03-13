import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CocktailsList = () => {
  const navigation = useNavigation();
  const [cocktails, setCocktails] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
  const navigateToCocktailDetails = (idDrink) => {
    if (idDrink) {
      navigation.navigate('CocktailDetails', { idDrink });
    } else {
      console.error('ID not provided for navigation to CocktailDetails');
    }
  };

  const loadCocktailsByLetter = async (letter) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${encodeURIComponent(letter)}`);
      const data = await response.json();
      return data.drinks || [];
    } catch (error) {
      console.error(`Error fetching data for letter ${letter}:`, error);
      return [];
    }
  };

  const loadAllCocktails = async () => {
    try {
      const allCocktails = [];
      for (const letter of alphabet) {
        const cocktailsByLetter = await loadCocktailsByLetter(letter);
        allCocktails.push(...cocktailsByLetter);
      }
      setCocktails(allCocktails); 
      setFilteredCocktails(allCocktails); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all cocktails:', error);
    }
  };

  useEffect(() => {
    loadAllCocktails(); 
  }, []);

  const handleSearch = (text) => {
    setSearchText(text); 
    const filtered = cocktails.filter(cocktail =>
      cocktail.strDrink.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCocktails(filtered); 
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToCocktailDetails(item.idDrink)}>
      <View style={styles.cocktailItem}>
        <Image source={{ uri: item.strDrinkThumb }} style={styles.thumbnail} />
        <Text style={styles.cocktailName}>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Search cocktail..."
            onChangeText={handleSearch}
            value={searchText}
          />
          <FlatList
            data={filteredCocktails}
            renderItem={renderItem}
            keyExtractor={(item) => item.idDrink}
            style={styles.flatList}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cocktailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cocktailName: {
    fontSize: 18,
  },
  flatList: {
    width: '100%',
  },
});

export default CocktailsList;
