import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from "../credentials";
import { Title, Subheading } from 'react-native-paper';

export default function Loginscreen ({ navigation }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  let auth;
  try { 
    //eliminaar este navigation para pedir usuario
    navigation.replace('Inicio');
    auth = getFirebaseAuth();
    console.log("Auth inicializado:", auth);
  } catch (e) {
    console.error("Error al obtener auth:", e);
    Alert.alert("Error interno", "No se pudo inicializar Firebase Auth.");
    return;
  }

    try {
     const userCredential = await signInWithEmailAndPassword(auth, email, password);  
        console.log("Login exitoso:", userCredential.user.email);
      navigation.replace('Inicio');
    } catch (error) {
      Alert.alert('Error', 'Usuario o Contraseña inválidas. Por favor, intenta nuevamente.');
    }
  };

  const handleCrearCuenta = () => {
    navigation.navigate('CrearCuenta');
  };

  return (
    <View style={styles.container}>
      {/* Título principal */}
      <Title style={styles.title}>Trabajo Práctico</Title>

      {/* Subtítulo */}
      <Subheading style={styles.subtitle}>WordleApp</Subheading>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"/>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry/>
    
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Botón de "Crear cuenta" */}
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

