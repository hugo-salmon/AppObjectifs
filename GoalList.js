import React from 'react';
import { FlatList } from 'react-native';
import GoalItem from './GoalItem';

const GoalList = ({ goals, onDelete }) => {
  return (
    <FlatList
      data={goals}
      renderItem={({ item, index }) => (
        <GoalItem goal={item} onDelete={() => onDelete(index)} />
      )}
    />
  );
};

export default GoalList;
