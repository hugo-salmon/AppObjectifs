import React, { useEffect, useState, useRef } from "react";
import { StatusBar, ImageBackground, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Loader from "./components/Loader";
import ScrollTopButton from "./components/ScrollTopButton";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { getBackgroundImage, getDayOfWeek, getHour } from "./components/Utils";

const apiKey = "123d1e4d375366e2f26a9005f945d865";

const App = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.error("Impossible d'avoir la localisation");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=fr&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const weatherData = await response.json();
        setWeatherData(weatherData);

        const today = new Date();
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const formattedDate = today.toLocaleDateString("fr-FR", options);
        setCurrentDate(
          formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
        );

        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=fr&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastApiUrl);
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData.list);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données météorologiques",
          error.message
        );
      }
    };

    fetchData();
  }, []);

  const forecastDataByDay = () => {
    const data = {};
    forecastData.forEach((item) => {
      const day = getDayOfWeek(item.dt_txt);
      if (!data[day]) {
        data[day] = [];
      }
      data[day].push(item);
    });

    return Object.values(data);
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo();
    }
  };

  if (loading) {
    return <Loader />;
  }

  const { main, weather } = weatherData;
  const { temp, feels_like, temp_max, temp_min } = main;
  const { description, icon } = weather[0];
  const cityName = weatherData.name;

  const backgroundImage = getBackgroundImage(icon);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <CurrentWeather
          cityName={cityName}
          currentDate={currentDate}
          temp={temp}
          feels_like={feels_like}
          description={description}
          icon={icon}
          temp_max={temp_max}
          temp_min={temp_min}
        />
        <StatusBar style="light-content" />

        {forecastData && (
          <Forecast
            forecastData={forecastDataByDay()}
            getDayOfWeek={getDayOfWeek}
            getHour={getHour}
            scrollViewRef={scrollViewRef}
            setScrollPosition={setScrollPosition}
          />
        )}

        {scrollPosition > 0 && <ScrollTopButton scrollToTop={scrollToTop} />}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    paddingTop: 70,
  }
});

export default App;
