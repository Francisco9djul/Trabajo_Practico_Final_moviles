import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Grid from '../components/grid';
import Keyboard from '../components/keyboard';

import { validWords, getRandomWord } from '../utils/words';

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

  const onKeyPress = (key) => {
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  message: {
    textAlign: 'center',
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
});
