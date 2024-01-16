import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import GoalItem from './GoalItem';

const GoalList = ({ goals, onDelete, onModify }) => {
  return (
    <FlatList
      data={goals}
      renderItem={({ item, index }) => (
        <GoalItem goal={item} onDelete={() => onDelete(index)} onModify={() => onModify(index)} />
      )}
      style={styles.flatList} 
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%', 
  },
});

export default GoalList;
