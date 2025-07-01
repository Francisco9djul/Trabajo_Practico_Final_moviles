import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './cell';

export default function Grid({ attempts, currentAttempt, secretWord, maxAttempts, wordLength }) {

  // Función para obtener el color de cada letra
  const getColor = (letter, index, attempt) => {
    if (!secretWord) return 'white';

    if (secretWord[index] === letter) return '#6aaa64'; // verde
    else if (secretWord.includes(letter)) return '#c9b458'; // amarillo
    else return '#787c7e'; // gris
  };

  return (
   <View style={styles.grid}>
  {[...Array(maxAttempts)].map((_, rowIndex) => {
    
    const word = attempts[rowIndex] || (rowIndex === attempts.length ? currentAttempt : '');

    return (
      <View key={rowIndex} style={styles.row}>
        {[...Array(wordLength)].map((_, i) => {
          const letter = word[i] || '';
          // Si está en fila actual, pintamos verde; si no, gris para que se vea mejor
          const color = rowIndex < attempts.length ? getColor(letter, i, word) : 'white';
          return <Cell key={i} letter={letter} backgroundColor={color} />;
        })}
      </View>
    );
  })}
</View>

  );
}

const styles = StyleSheet.create({
  grid: { marginBottom: 20, alignSelf: 'center' },
  row: { flexDirection: 'row', justifyContent: 'center' },
});
