import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ScrollTopButton = ({ scrollToTop }) => {
  return (
    <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
      <Text style={styles.scrollToTopButtonText}>↑</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scrollToTopButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3498DB",
    padding: 5,
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
  },
  scrollToTopButtonText: {
    color: "white",
    fontSize: 15,
  },
});

export default ScrollTopButton;
