import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';

const CocktailsList = ({ favorites, toggleFavorite }) => {
  const navigation = useNavigation();
  const [cocktails, setCocktails] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('Tout');
  const flatListRef = useRef();
  const letters = ['Tout', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
  const lettersRef = useRef(null);

  useEffect(() => {
    if (selectedLetter !== 'Tout') {
      setFilteredCocktails(cocktails.filter(cocktail => cocktail.strDrink.startsWith(selectedLetter)));
    } else {
      setFilteredCocktails(cocktails);
    }
  }, [selectedLetter, cocktails]);

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
    navigation.navigate('CocktailDetails', { idDrink: idDrink, favorites:favorites, toggleFavorite:toggleFavorite });
  };

  const handleLetterSelection = (letter) => {
    if (selectedLetter === letter) {
      setSelectedLetter('Tout');
      setFilteredCocktails(cocktails);
      lettersRef.current.scrollToOffset({ offset: 0, animated: true });
    } else {
      setSelectedLetter(letter);
      setSearchText('');

      if (letter !== 'Tout') {
        const index = letters.indexOf(letter);
        if (index !== -1 && lettersRef.current) {
          const itemWidth = 40; 
          let offset = (index * itemWidth) - halfScreen + (itemWidth / 2);

          if (letters.slice(-4).includes(letter)) {
            const adjustement = -40; 
            offset -= adjustement;
          } else {
            const adjustement = -70; 
            offset -= adjustement;
          }

          offset = Math.max(0, offset);
          lettersRef.current.scrollToOffset({ offset, animated: true });
        }
      } else {
        lettersRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }
  };
  
  const renderLetterItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleLetterSelection(item)}>
      <View style={[styles.letterItem, selectedLetter === item ? styles.selectedLetterItem : {}]}>
        <Text style={styles.letterText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

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
          <View style={styles.centered}>
              <LottieView
                source={require('../assets/lottie/cocktail_loader.json')}
                autoPlay
                loop
                style={styles.lottieLoader}
              />
          </View>
        ) : (
          <>
            <View style={styles.filterContainer}>
              <Text style={styles.filterByText}>Filtrer par lettre:</Text>
              <FlatList
                horizontal
                data={letters}
                renderItem={renderLetterItem}
                keyExtractor={item => item}
                ref={lettersRef}
                showsHorizontalScrollIndicator={false}
                style={styles.lettersList}
              />
            </View>
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lottieLoader: {
    width: 200,
    height: 200, 
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 15, 
  },
  filterByText: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  letterItem: {
    padding: 8, 
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  selectedLetterItem: {
    backgroundColor: '#007bff',
  },
  letterText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18, 
  },
});

export default CocktailsList;
