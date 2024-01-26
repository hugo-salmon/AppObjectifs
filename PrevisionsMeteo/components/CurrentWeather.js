import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { capitalizeFirstLetter } from "./Utils";

const CurrentWeather = ({ cityName, currentDate, temp, feels_like, description, icon, temp_max, temp_min }) => {
  
  const position = "Ma position";

  return (
    <>
      <Text style={styles.position}>{position}</Text>
      <Text style={styles.cityName}>{cityName}</Text>
      <Text style={styles.currentDate}>{currentDate}</Text>
      <Text style={styles.temperature}>{Math.round(temp)}°</Text>
      <Text style={styles.feelsLike}>Ressenti : {Math.round(feels_like)}°</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {capitalizeFirstLetter(description)}
        </Text>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${icon}.png` }}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.temperatureRange}>
        <Text style={styles.temperatureMax}>↑ {Math.round(temp_max)}°</Text>
        <Text style={styles.temperatureMin}>↓ {Math.round(temp_min)}°</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
  },
  position: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  cityName: {
    fontSize: 20,
    color: "lightgrey",
    marginTop: 5,
  },
  temperature: {
    fontSize: 100,
    color: "white",
    marginTop: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 30,
  },
  description: {
    fontSize: 24,
    color: "white",
    marginRight: 10,
  },
  weatherIcon: {
    width: 80,
    height: 80,
    tintColor: "white",
  },
  feelsLike: {
    fontSize: 22,
    color: "lightgrey",
    marginTop: 5,
    marginRight: 10,
  },
  currentDate: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
  },
  temperatureRange: {
    flexDirection: "row",
    marginRight: 20,
    marginBottom: 20,
  },
  temperatureMin: {
    fontSize: 25,
    color: "red",
    marginHorizontal: 5,
    fontWeight: "bold",
  },
  temperatureMax: {
    fontSize: 25,
    color: "green",
    marginHorizontal: 5,
    fontWeight: "bold",
  },
});

export default CurrentWeather;
