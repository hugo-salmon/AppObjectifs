import React from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import { getDayOfWeek, getHour } from "./Utils";

const Forecast = ({ forecastData, scrollViewRef, setScrollPosition }) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={(event) => {
        setScrollPosition(event.nativeEvent.contentOffset.y);
      }}
      scrollEventThrottle={200}
      style={styles.outerScrollView}
    >
      <Text style={styles.heading}>Prévisions sur 5 jours</Text>
      {forecastData.map((dayData, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayName}>{getDayOfWeek(dayData[0].dt_txt)}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dayData.map((item) => (
              <View key={item.dt.toString()} style={styles.forecastItem}>
                <Text style={styles.currentDate}>{getHour(item.dt_txt)}</Text>
                <Text style={styles.currentDate}>
                  {Math.round(item.main.temp)}°
                </Text>
                <Image
                  style={styles.weatherIcon}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerScrollView: {
    marginTop: 10,
    borderRadius: 15,
  },
  forecastItem: {
    marginRight: 15,
    alignItems: "center",
  },
  dayContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  dayName: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  weatherIcon: {
    width: 80,
    height: 80,
    tintColor: "white",
  },
  currentDate: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
  },
});

export default Forecast;
