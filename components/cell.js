import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Cell({ letter, backgroundColor }) {
  return (
    <View style={[styles.cell, { backgroundColor }]}>
      <Text style={styles.letter}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 2,
    borderColor: '#3a3a3c',
    width: 50,
    height: 50,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
