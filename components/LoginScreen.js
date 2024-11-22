import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { ProfileContext } from '../contexts/ProfileContext'; // Import Context

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { setUserId, setToken } = useContext(ProfileContext); // Add setToken

  const handleLogin = async () => {
    try {
      const response = await fetch('https://coremax-be.octopi-labs.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        setUserId(data.data.id); // Save the user ID in context
        setToken(data.data.jwt_token); // Save the JWT token
        navigation.navigate('Home'); // Navigate to Home
        // console.log('Login successful:', data);
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
});

export default LoginScreen;
