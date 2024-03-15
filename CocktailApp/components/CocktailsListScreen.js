import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CocktailsList = ({ favorites, toggleFavorite }) => {
  const navigation = useNavigation();
  const [cocktails, setCocktails] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    loadAllCocktails();
  }, []);

  const loadAllCocktails = async () => {
    setLoading(true);
    try {
      const allCocktails = [];
      for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${encodeURIComponent(letter)}`);
        const data = await response.json();
        if (data.drinks) {
          allCocktails.push(...data.drinks);
        }
      }
      setCocktails(allCocktails);
      setFilteredCocktails(allCocktails);
    } catch (error) {
      console.error('Erreur dans la récupération de tous les cocktails :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text) {
      setFilteredCocktails(cocktails);
    } else {
      const filtered = cocktails.filter(cocktail =>
        cocktail.strDrink.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCocktails(filtered);
    }
  };

  const clearSearchText = () => {
    setSearchText('');
    setFilteredCocktails(cocktails);
  };

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const navigateToCocktailDetails = (idDrink) => {
    navigation.navigate('CocktailDetails', { idDrink });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToCocktailDetails(item.idDrink)}>
      <View style={styles.cocktailItem}>
        <Image source={{ uri: item.strDrinkThumb }} style={styles.thumbnail} />
        <Text style={styles.cocktailName}>{item.strDrink}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteIcon}>
          <Icon name={favorites.some(fav => fav.idDrink === item.idDrink) ? 'heart' : 'heart-o'} size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Rechercher un cocktail..."
                onChangeText={handleSearch}
                value={searchText}
              />
              {searchText && (
                <TouchableOpacity onPress={clearSearchText} style={styles.clearButton}>
                  <Icon name="times" size={24} color="#000" />
                </TouchableOpacity>
              )}
            </View>
            {filteredCocktails.length === 0 ? (
              <Text style={styles.noResultsText}>Aucun résultat.</Text>
            ) : (
              <>
                <FlatList
                  data={filteredCocktails}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.idDrink.toString()}
                  ref={flatListRef}
                  style={styles.flatList}
                />
                <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
                  <Icon name="arrow-up" size={24} color="#fff" />
                </TouchableOpacity>
              </>
            )}
          </>
        )}
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20, 
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFA', 
  },
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0', 
    borderRadius: 20, 
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
  },
  input: {
    flex: 1,
    marginRight: 10, 
  },
  clearButton: {
    padding: 5, 
  },
  clearButtonText: {
    fontSize: 20,
    color: '#606060', 
  },
  cocktailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', 
    width: '100%',
  },
  thumbnail: {
    width: 60, 
    height: 60,
    borderRadius: 30, 
    marginRight: 15,
  },
  cocktailName: {
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold', 
  },
  favorite: {
    fontSize: 22, 
    color: '#FF6347', 
  },
  flatList: {
    width: '100%',
  },
  noResultsText: {
    fontSize: 18,
    marginTop: 50, 
    color: '#606060', 
  },
  favoriteIcon: {
    marginRight: 10, 
  },
  scrollToTopButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'blue',
    borderRadius: 25,
    padding: 10,
  },
});


export default CocktailsList;
