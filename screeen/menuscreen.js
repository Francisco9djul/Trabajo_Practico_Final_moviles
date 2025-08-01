import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

export default function MenuScreen() {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  if (!fontsLoaded) {
    // Mostrar un loader mientras cargan las fuentes
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#d0f0c0', '#a8edea']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Wordle</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Jugar')}
        >
          <Text style={styles.buttonText}>Jugar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Ranking')}
        >
          <Text style={styles.buttonText}>Ranking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reglas')}
        >
          <Text style={styles.buttonText}>Reglas</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 54,
    fontFamily: 'FredokaOne_400Regular',
    fontWeight: 'normal',
    marginBottom: 28,
    color: '#ffffff',
    textAlign: 'center',

    // Sombra 
    textShadowColor: '#2e7d32', 
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 4,

    // Sombra adicional para Android
    shadowColor: '#2e7d32',
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});