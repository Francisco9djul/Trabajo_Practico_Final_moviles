import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';

import Grid from '../components/grid';
import Keyboard from "../components/keyboard";

import { validWords, getRandomWord } from '../utils/words';
import { styles } from '../styles/styles';

const wordLength = 5;
const maxAttempts = 6;

export default function Gamescreen() {
  const [secretWord, setSecretWord] = useState('');
  const [attempts, setAttempts] = useState([]); // lista de palabras intentadas
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setSecretWord(getRandomWord());
  }, []);

  const onKeyPress = (key) => {
    console.log("Tecla presionada:", key); 
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentAttempt.length !== wordLength) {
        Alert.alert('La palabra debe tener 5 letras');
        return;
      }
      if (!validWords.includes(currentAttempt.toLowerCase())) {
        Alert.alert('Palabra no válida');
        return;
      }

      const newAttempts = [...attempts, currentAttempt];
      setAttempts(newAttempts);
      setCurrentAttempt('');

      if (currentAttempt === secretWord) {
        Alert.alert('¡Ganaste!');
        setGameOver(true);
      } else if (newAttempts.length >= maxAttempts) {
        Alert.alert(`Perdiste! La palabra era ${secretWord}`);
        setGameOver(true);
      }
    } else if (key === 'DEL') {
      setCurrentAttempt(currentAttempt.slice(0, -1));
    } else {
      if (currentAttempt.length < wordLength) {
        setCurrentAttempt(currentAttempt + key);
      }
    }
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
      
    </View>
    
  );
}
