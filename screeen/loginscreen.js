import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../credentials'; 
import { Title, Subheading } from 'react-native-paper';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function Loginscreen ({ navigation }){
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const handleLogin = async () => {
    setErrorMessage(''); // Limpiar mensaje anterior

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login exitoso:", user);
      navigation.replace('Inicio');
      // Navegar a otra pantalla o continuar
    } 
    catch (error) {
      console.log("Código de error:", error.code);

      if ( error.code === 'auth/user-not-found') {
        setErrorMessage('Usuario no encontrado. Por favor, verifica tu correo.');
      } else if (error.code === 'auth/invalid-credential') {
      setErrorMessage('Correo o contraseña incorrectos. Intenta nuevamente.');
      } else if (error.code === 'auth/missing-password') {
        setErrorMessage('Ingrese una contraseña. Intenta nuevamente.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Formato de correo inválido.');
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage('Demasiados intentos fallidos. Intenta más tarde.');
      } else {
        setErrorMessage('Ocurrió un error. Intenta más tarde.');
        console.error('Error desconocido:', error.message);
      }
    }
  };

  const handleCrearCuenta = () => {
    navigation.navigate('CrearCuenta');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Trabajo Práctico</Title>
      <Subheading style={styles.subtitle}>WordleApp</Subheading>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setErrorMessage('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setErrorMessage('');
        }}
        secureTextEntry
      />

      {errorMessage !== '' && (
         <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
      )}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccountButton} onPress={handleCrearCuenta}>
        <Text style={styles.createAccountText}>¿No tienes cuenta? Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
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
    
    // Sombrado para el campo de texto
    shadowColor: 'red',
    shadowOffset: { width:0, height: 8 },
    shadowOpacity: 0.3,  
    shadowRadius: 9,  
    elevation: 5,  
  },
  loginButton: {
    backgroundColor: '#4caf50',  
    borderRadius: 45,  
    width: '80%',
    paddingVertical: 10,  
    marginTop: 10,
    alignItems: 'center',  
  },
  loginButtonText: {
    color: '#fff',  
    fontSize: 16,  
    fontWeight: 'bold', 
  },
  createAccountButton: {
    marginTop: 15,
  },
  createAccountText: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

