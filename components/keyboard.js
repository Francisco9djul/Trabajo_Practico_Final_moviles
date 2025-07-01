import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
              style={styles.key}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
          {i === 2 && (
            <>
              <TouchableOpacity style={[styles.key, {flex: 1}]} onPress={() => onKeyPress('ENTER')}>
                <Text style={styles.keyText}>ENTER</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.key, {flex: 1}]} onPress={() => onKeyPress('DEL')}>
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
  keyboard: { alignSelf: 'center' },
  keyboardRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 8 },
  key: {
    margin: 2,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#818384',
    borderRadius: 4,
    minWidth: 30,
    alignItems: 'center',
  },
  keyText: { color: 'white', fontWeight: 'bold' },
});
