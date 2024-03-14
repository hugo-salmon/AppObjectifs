import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import CocktailsList from './CocktailsListScreen';
import CocktailDetails from './CocktailDetails';
import FavoriteCocktails from './FavoriteCocktailsScreen'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Homepage = ({ favorites, toggleFavorite }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Nos cocktails" options={{ title: 'Nos cocktails' }}>
        {() => <CocktailsList favorites={favorites} toggleFavorite={toggleFavorite} />}
      </Stack.Screen>
      <Stack.Screen name="CocktailDetails" component={CocktailDetails} options={{ title: 'Détails du cocktail' }} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (cocktail) => {
    const isFavorite = favorites.find(fav => fav.idDrink === cocktail.idDrink);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.idDrink !== cocktail.idDrink));
    } else {
      setFavorites([...favorites, cocktail]);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="CocktailApp" options={{ tabBarLabel: 'Cocktails' }}>
        {() => <Homepage favorites={favorites} toggleFavorite={toggleFavorite} />}
      </Tab.Screen>
      <Tab.Screen name="Favoris" options={{ tabBarLabel: 'Favoris' }}>
        {() => <FavoriteCocktails favorites={favorites} toggleFavorite={toggleFavorite} />}
      </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
