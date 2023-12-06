import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const GoalItem = ({ goal, onDelete }) => {
  return (
    <View style={styles.goalContainer}>
      <Text style={styles.item}>{goal}</Text>
      <Pressable onPress={onDelete}>
        <Text style={styles.deleteButton}>❌</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 15,
    color: 'white',
  },
  deleteButton: {
    fontSize: 20,
    marginLeft: 10,
    color: 'red',
  },
});

export default GoalItem;
