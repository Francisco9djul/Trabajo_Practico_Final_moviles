import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function ReglasScreen() {
  let [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#a8e6cf', '#dcedc1']} style={styles.gradient}>
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
          📖 Solo se permiten palabras válidas del diccionario.
        </Text>

        <Text style={styles.rule}>
          🧠 Usá la lógica y los colores como pistas para descubrir la palabra secreta.
        </Text>

        <Text style={styles.rule}>
          🕐 ¡Jugá todos los días y mejorá tu récord en el ranking!
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    fontFamily: 'Poppins_400Regular',
    color: '#1b3a57',
  },
  rule: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#3a5f8a',
  },
  subRule: {
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#3a5f8a',
  },
});
