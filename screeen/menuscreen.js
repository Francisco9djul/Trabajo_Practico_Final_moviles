import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Jugar')}>
        <Text style={styles.buttonText}>Jugar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ranking')}>
        <Text style={styles.buttonText}>Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reglas')}>
        <Text style={styles.buttonText}>Reglas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',  // Para centrar horizontalmente
    padding: 20,
    gap: 15, // Espacio entre botones (solo funciona en RN 0.71+)
  },
  button: {
    backgroundColor: '#4caf50',
    borderRadius: 45,
    width: '80%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
