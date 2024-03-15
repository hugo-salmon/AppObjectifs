import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CocktailsList from './components/CocktailsListScreen';
import CocktailDetails from './components/CocktailDetails';
import FavoriteCocktails from './components/FavoriteCocktailsScreen'; 
import RandomCocktail from './components/RandomCocktailScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Homepage = ({ favorites, toggleFavorite }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Nos cocktails"
        options={{ title: 'Nos cocktails' }}
      >
        {() => <CocktailsList favorites={favorites} toggleFavorite={toggleFavorite} />}
      </Stack.Screen>
      <Stack.Screen
        name="CocktailDetails"
        component={CocktailDetails}
        options={{
          title: 'Détails du cocktail',
          headerBackTitle: 'Retour' 
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (cocktail) => {
    setFavorites(currentFavorites => {
      const isFavoriteIndex = currentFavorites.findIndex(fav => fav.idDrink === cocktail.idDrink);
      if (isFavoriteIndex >= 0) {
        const newFavorites = [...currentFavorites];
        newFavorites.splice(isFavoriteIndex, 1);
        return newFavorites;
      } else {
        return [...currentFavorites, cocktail];
      }
    });
  };
  const clearAllFavorites = () => {
    setFavorites([]); 
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
              screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'CocktailApp') {
                  iconName = focused ? 'glass' : 'glass';
                } else if (route.name === 'Favoris') {
                  iconName = focused ? 'heart' : 'heart-o';
                } else if (route.name === 'Cocktail aléatoire') {
                  iconName = focused ? 'random' : 'random';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
          <Tab.Screen name="CocktailApp" options={{ tabBarLabel: 'Cocktails' }}>
          {() => <Homepage favorites={favorites} toggleFavorite={toggleFavorite} />}
        </Tab.Screen>
        <Tab.Screen name="Favoris" options={{ tabBarLabel: 'Favoris' }}>
          {() => <FavoriteCocktails favorites={favorites} toggleFavorite={toggleFavorite} clearAllFavorites={clearAllFavorites}/>}
        </Tab.Screen>
        <Tab.Screen name="Cocktail aléatoire" component={RandomCocktail} options={{ tabBarLabel: 'Cocktail aléatoire'}}>
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    
  );
};

export default App;

