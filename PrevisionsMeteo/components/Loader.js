import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";

const Loader = () => {
  return (
    <ImageBackground source={require("../assets/loading_background.jpg")} style={styles.loaderImage}>
      <View style={styles.loaderContainer}>
        <Text style={styles.loadingText}>Chargement des données...</Text>
        <ActivityIndicator size="small" color="white" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loaderImage: {
    flex: 1,
    justifyContent: "center",
  },
  loaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 350,
  },
  loadingText: {
    marginTop: 10,
    marginRight: 20,
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default Loader;
