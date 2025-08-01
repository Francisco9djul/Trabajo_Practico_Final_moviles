import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Grid from '../components/grid';
import Keyboard from '../components/keyboard';

import { validWords, getRandomWord } from '../utils/words';

import { auth, db } from '../credentials'; 
import { doc, updateDoc, increment } from 'firebase/firestore';

import { LinearGradient } from 'expo-linear-gradient';  

const wordLength = 5;
const maxAttempts = 6;

export default function Gamescreen() {
  const [secretWord, setSecretWord] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setSecretWord(getRandomWord());
    setAttempts([]);
    setCurrentAttempt('');
    setGameOver(false);
    setMessage('');
  };

  const contarLetras = (palabra) => {
    return [...palabra].filter(letra =>
      /[a-záéíóúñ]/i.test(letra)
    ).length;
  };

  const onKeyPress = async (key) => {
    if (gameOver) {
      startNewGame();
      return;
    }

    if (key === 'ENTER') {
      if (contarLetras(currentAttempt) !== wordLength) {
        setMessage(`La palabra debe tener ${wordLength} letras`);
        clearMessageAfterDelay();
        return;
      }

      const newAttempts = [...attempts, currentAttempt];
      setAttempts(newAttempts);
      setCurrentAttempt('');

      const intentoNormalizado = currentAttempt.normalize("NFC").toLowerCase();
      const secretaNormalizada = secretWord.normalize("NFC").toLowerCase();

      if (intentoNormalizado === secretaNormalizada) {
        setMessage('¡Ganaste! Presiona cualquier tecla para jugar otra vez');
        setGameOver(true);

        if (auth.currentUser) {
          const userRef = doc(db, 'usuarios', auth.currentUser.uid);
          try {
            await updateDoc(userRef, {
              puntaje: increment(1)
            });
            console.log('Puntaje actualizado +1');
          } catch (error) {
            console.error('Error actualizando puntaje:', error);
          }
        }

      } else if (newAttempts.length >= maxAttempts) {
        setMessage(`Perdiste! La palabra era "${secretWord}". Presiona cualquier tecla para jugar otra vez`);
        setGameOver(true);
      } else {
        if (!validWords.includes(intentoNormalizado)) {
          setMessage('Palabra no reconocida, intento gastado');
          clearMessageAfterDelay();
        } else {
          setMessage('');
        }
      }

    } else if (key === 'DEL') {
      setCurrentAttempt(currentAttempt.slice(0, -1));
      setMessage('');
    } else {
      if (contarLetras(currentAttempt) < wordLength) {
        setCurrentAttempt(currentAttempt + key);
        setMessage('');
      }
    }
  };

  const clearMessageAfterDelay = () => {
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <LinearGradient
      colors={['#8fd8b7', '#D3EDC0']}  // degradado verde claro 
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Grid
          attempts={attempts}
          currentAttempt={currentAttempt}
          secretWord={secretWord}
          maxAttempts={maxAttempts}
          wordLength={wordLength}
        />
        <Keyboard onKeyPress={onKeyPress} />
        {message !== '' && (
          <Text style={styles.message}>{message}</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
});