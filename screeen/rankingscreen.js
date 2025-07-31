import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../credentials'; // Ajusta el path si es necesario
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function RankingScreen() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'usuarios'), orderBy('puntaje', 'desc'), limit(10));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersRanking = [];
      querySnapshot.forEach((doc) => {
        usersRanking.push({ id: doc.id, ...doc.data() });
      });
      setRanking(usersRanking);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking de Jugadores</Text>

      <FlatList
        data={ranking}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.position}>{index + 1}°</Text>
            <Text style={styles.name}>{item.nombreyapellido || item.email}</Text>
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