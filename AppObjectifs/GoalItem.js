import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GoalItem = ({ goal, onDelete, onModify }) => {
  const [isChecked, setIsChecked] = useState(false);

  const stateCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.goalContainer}>
      <View style={styles.checkboxContainer}>
        <Pressable onPress={stateCheckbox}>
          {isChecked ? (
            <Icon name="check" size={30} color="green" />
          ) : (
            <Icon name="square-o" size={30} color="orange" />
          )}
        </Pressable>
      </View>
      <Text style={[styles.item, isChecked && styles.checkedBox]} numberOfLines={100}>
        <Text style={[styles.goalText, isChecked && styles.checkedBoxText]}>{goal}</Text>
      </Text>
      <View style={styles.buttonContainer}>
          <Pressable onPress={onModify}>
            <Text style={styles.modifyButton}>✏️</Text>
          </Pressable>
          <Pressable onPress={onDelete}>
            <Text style={styles.deleteButton}>❌</Text>
          </Pressable>
      </View>
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
    flex: 1,
    padding: 10,
    fontSize: 15,
    color: 'white',
  },
  checkedBox: {
    textDecorationLine: 'line-through',
  },
  checkboxContainer: {
    marginLeft: 5,
  },
  goalText: {
    color: 'white',
  },
  checkedBoxText: {
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  modifyButton: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default GoalItem;
