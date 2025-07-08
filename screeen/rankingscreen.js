import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
//datos hardcodeados se implementara cuando el login funcioner
const datosRanking = [
  { id: '1', nombre: 'Juan', puntaje: 120 },
  { id: '2', nombre: 'Lucía', puntaje: 110 },
  { id: '3', nombre: 'Carlos', puntaje: 100 },
  { id: '4', nombre: 'Sofía', puntaje: 90 },
  { id: '5', nombre: 'Martín', puntaje: 85 },
];

export default function RankingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking de Jugadores</Text>

      <FlatList
        data={datosRanking}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.position}>{index + 1}°</Text>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.score}>{item.puntaje} pts</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  position: {
    fontWeight: 'bold', fontSize: 16, width: 30,
  },
  name: {
    fontSize: 16, flex: 1,
  },
  score: {
    fontWeight: 'bold', fontSize: 16,
  },
});
