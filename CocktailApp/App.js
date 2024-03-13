// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import CocktailsList from './CocktailsListScreen';
import CocktailDetails from './CocktailDetails';
import RandomCocktail from './RandomCocktailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Homepage = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cocktails List" component={CocktailsList} options={{ title: 'Cocktails List' }} />
      <Stack.Screen name="CocktailDetails" component={CocktailDetails} options={{ title: 'Cocktail Details' }} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="MainStack" component={Homepage} options={{ tabBarLabel: 'Cocktails' }} />
        <Tab.Screen name="Random Cocktail" component={SearchByIngredientScreen} options={{ tabBarLabel: 'Random Cocktail' }} />
        <Tab.Screen name="RandomCocktail" component={RandomCocktailScreen} options={{ tabBarLabel: 'Random Cocktail' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
