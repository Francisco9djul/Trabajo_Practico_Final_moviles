import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../credentials';
import { Title, Subheading } from 'react-native-paper';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { LinearGradient } from 'expo-linear-gradient';

const Crearcuentascreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [nombreyapellido, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleCrearCuenta = async () => {

    if (!nombreyapellido.trim()) {
      setError('Por favor, ingrese su nombre y apellido.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      // 1. Crear el usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Usuario creado:", user);

      // 2. Guardar el usuario en Firestore (colección "usuarios")
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        email: user.email,
        nombreyapellido: nombreyapellido, 
        puntaje: 0, // puntuación inicial
        creado: new Date()
      });

      Alert.alert('✅ Cuenta creada', 'Tu cuenta ha sido creada exitosamente.');
      navigation.replace('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('El correo ya está registrado.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Formato de correo inválido.');
      } else {
        setError('Error al crear la cuenta. Intenta nuevamente.');
        console.error(error); // log para desarrollo
      }
    }
  };
  const [fontsLoaded] = useFonts({ FredokaOne_400Regular });
  if (!fontsLoaded) return null;

  return (
    <LinearGradient colors={['#d0f0c0', '#a8edea']} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Wordle</Text>
        <Text style={styles.subtitle}>Crear Cuenta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre y Apellido"
          value={nombreyapellido}
          onChangeText={(text) => {
            setNombre(text);
            setError('');
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.createButton} onPress={handleCrearCuenta}>
          <Text style={styles.createButtonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
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
    fontSize: 52,
    fontFamily: 'FredokaOne_400Regular',
    fontWeight: 'normal',
    marginBottom: 28,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: '#1b5e20',
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 4,
    shadowColor: '#1b5e20',
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'FredokaOne_400Regular',
    color: '#ffffff',        // un verde turquesa oscuro
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: '#004D40', // sombra más oscura
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    height: 45,  
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 45,  
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '2e7d32',
    shadowOffset: { width:0, height: 8 },
    shadowOpacity: 0.3,  
    shadowRadius: 9,  
    elevation: 5,  
  },
  createButton: {
    backgroundColor: '#4caf50',  
    borderRadius: 45,  
    width: '80%',
    paddingVertical: 10,  
    marginTop: 10,
    alignItems: 'center',  
  },
  createButtonText: {
    color: '#fff',  
    fontSize: 16,  
    fontWeight: 'bold', 
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Crearcuentascreen;
