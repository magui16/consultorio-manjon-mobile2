import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';  
import { auth } from '../src/config/firebaseConfig';  
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';

const Stack = createStackNavigator();

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true); 
      } else {
        setIsAuthenticated(false); 
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // === ESTADO AUTENTICADO: MUESTRA LA APLICACIÓN PRINCIPAL ===
          // Renderiza el AppTabs, que contiene el Bottom Tab Navigator.
          // Cualquier navegación dentro de AppTabs tendrá el menú inferior.
          <>
            <Stack.Screen name="App" component={AppTabs} />
            <Stack.Screen name="NuevoPaciente" component={NuevoPaciente} />
          </>
        ) : (
          // === ESTADO NO AUTENTICADO: MUESTRA EL STACK DE AUTENTICACIÓN ===
          // Estas pantallas NO tendrán el menú inferior.
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            {/* <Stack.Screen name="NuevoPaciente" component={NuevoPaciente} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
