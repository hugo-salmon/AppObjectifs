import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import * as Location from 'expo-location';

const apiKey = '123d1e4d375366e2f26a9005f945d865';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  const getBackgroundImage = (iconCode) => {
    if (iconCode.includes('01')) {
      return require('./assets/clear_sky.jpeg');
    } else if (iconCode.includes('02')) {
      return require('./assets/few_clouds.webp');
    } else if (iconCode.includes('03')) {
      return require('./assets/scattered_clouds.jpeg');
    } else if (iconCode.includes('04')) {
      return require('./assets/broken_clouds.jpeg');
    } else if (iconCode.includes('09') || (iconCode.includes('10'))) {
      return require('./assets/rain.jpeg');
    } else if (iconCode.includes('11')) {
      return require('./assets/thunderstrom.jpeg')
    } 
      else if (iconCode.includes('13')) {
      return require('./assets/snow.jpeg');
    } else {
      return require('./assets/mist.jpeg');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.error("Impossible d'avoir la localisation");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=fr&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Erreur de localisation', error);
      }
    })();
  }, []);

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('fr-FR', options);
    const capitalizedDate = capitalizeFirstLetter(formattedDate);
    setCurrentDate(capitalizedDate);
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  if (!location || !weatherData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  const { main, weather } = weatherData;
  const { temp, feels_like, temp_max, temp_min } = main;
  const { description, icon } = weather[0];
  const cityName = weatherData.name;
  const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
  const backgroundImage = getBackgroundImage(icon);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Ma position</Text>
        <Text style={styles.cityName}>{cityName}</Text>
        <Text style={styles.currentDate}>{currentDate}</Text>
        <Text style={styles.temperature}>{Math.round(temp)}°</Text>
        <Text style={styles.feelsLike}>Ressenti : {Math.round(feels_like)}°</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{capitalizedDescription}</Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${icon}.png` }}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.temperatureRange}>
          <Text style={styles.temperatureMinMax}>↑ {Math.round(temp_min)}°</Text>
          <Text style={styles.temperatureMinMax}>↓ {Math.round(temp_max)}°</Text>
        </View>
        <StatusBar style="light-content" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  cityName: {
    fontSize: 18,
    color: 'grey',
    marginTop: 10
  },
  temperature: {
    fontSize: 90,
    color: 'white',
    marginTop: 5,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 0,
  },
  description: {
    fontSize: 20,
    color: 'white',
  },
  temperatureRange: {
    flexDirection: 'row',
    marginRight: 15,
  },
  temperatureMinMax: {
    fontSize: 18,
    color: 'white',
    marginRight: 5,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
  feelsLike: {
    fontSize: 19,
    color: 'white',
    marginRight: 20,
    marginTop: -10,
    color: 'lightgrey',
  },
  currentDate: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
});
