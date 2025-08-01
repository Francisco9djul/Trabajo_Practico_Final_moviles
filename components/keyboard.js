import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const keyboardRows = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L','Ñ'],
  ['Z','X','C','V','B','N','M'],
];

export default function Keyboard({ onKeyPress }) {
  return (
    <View style={styles.keyboard}>
      {keyboardRows.map((row, i) => (
        <View key={i} style={styles.keyboardRow}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.key, { flex: 1 }]}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
          {i === 2 && (
            <>
              <TouchableOpacity
                style={[styles.key, styles.specialKey, { backgroundColor: '#388e3c' }]} // azul para ENT
                onPress={() => onKeyPress('ENTER')}
              >
                <Text style={styles.keyText}>ENT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.key, styles.specialKey, { backgroundColor: '#f44336' }]} // rojo para DEL
                onPress={() => onKeyPress('DEL')}
              >
                <Text style={styles.keyText}>DEL</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    width: screenWidth - 20,
    alignSelf: 'center',
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  key: {
    backgroundColor: '#4caf50',
    marginHorizontal: 2,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  specialKey: {
    flex: 1.5,
  },
  keyText: {
    color: 'white',
    fontWeight: 'bold',
  },
});