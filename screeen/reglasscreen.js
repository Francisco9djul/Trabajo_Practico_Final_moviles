import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ReglasScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reglas del Juego</Text>

      <Text style={styles.rule}>
        🎯 El objetivo es adivinar una palabra de 5 letras en 6 intentos o menos.
      </Text>

      <Text style={styles.rule}>
        🔤 Cada vez que ingresás una palabra, las letras cambian de color:
      </Text>

      <Text style={styles.subRule}>
        🟩 Verde: La letra está en la palabra y en la posición correcta.
      </Text>

      <Text style={styles.subRule}>
        🟨 Amarillo: La letra está en la palabra pero en otra posición.
      </Text>

      <Text style={styles.subRule}>
        ⬜ Gris: La letra no está en la palabra.
      </Text>

      <Text style={styles.rule}>
        ⌨️ Solo se permiten palabras válidas del diccionario.
      </Text>

      <Text style={styles.rule}>
        🧠 Usá la lógica y los colores como pistas para descubrir la palabra secreta.
      </Text>

      <Text style={styles.rule}>
        🕐 ¡Jugá todos los días y mejorá tu récord en el ranking!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  rule: {
    fontSize: 16,
    marginBottom: 15,
  },
  subRule: {
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10,
  },
});
