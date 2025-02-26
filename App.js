import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../Demo4/components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import { ProfileProvider } from './contexts/ProfileContext'; // Import ProfileProvider
// import User from './components/User';
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false); // Set loading to false after checking
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return null; // Or you can show a loading spinner or splash screen
  }

  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* <Stack.Screen name="User" component={User} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
};

export default App;
