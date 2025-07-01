import Crearcuentascreen from "./screeen/crearcuentascreen";
import Gamescreen from "./screeen/gamescreen";
import Loginscreen from "./screeen/loginscreen";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Loginscreen} />
        <Stack.Screen name="Inicio" component={Gamescreen} /> 
        <Stack.Screen name="CrearCuenta" component={Crearcuentascreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;