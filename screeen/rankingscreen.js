import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { db } from '../credentials';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Tabla de Posiciones</Text>

        <FlatList
          data={ranking}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
           <View style={styles.itemWrapper}>
            <View style={styles.item}>
              <Text style={styles.position}>{index + 1}°</Text>
              <Text style={styles.name}>{item.nombreyapellido || item.email}</Text>
              <Text style={styles.score}>{item.puntaje} pts</Text>
            </View>
           </View> 
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'System',
  },
  itemWrapper: {
    paddingHorizontal: 7, 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    borderColor: '#ffffff33',
    borderWidth: 1,
  },
  position: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 30,
    color: '#F9D342',
  },
  name: {
    fontSize: 16,
    flex: 1,
    color: '#ffffff',
  },
  score: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7DFFAF',
  },
});