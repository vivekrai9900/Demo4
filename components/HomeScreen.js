import React, { useContext, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { ProfileContext } from '../contexts/ProfileContext';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import helloUser from './helloUser';
// import User from './User';
// import { UIContext } from '../contexts/UIcontext';

const HomeScreen = ({navigation}) => {
  const { userId, token, profile, setProfile, setToken } = useContext(ProfileContext);
//   const { theme, setUserTheme} = useContext(UIContext);


const handle_helloUser = () => {
    navigation.navigate('User');
}

const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem('token');

      // Clear user context data
    //   setUserId(null);
      setToken(null);

      // Navigate back to Login screen
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong!');
      console.log('Error logging out:', error);
    }
  };


  const getProfile = async () => {
    try {
      console.log("Fetching profile for user:", userId); // Debug log
  
      const response = await fetch(`https://coremax-java-be.octopi-labs.com/api/1.0.0/profile/${userId}`, {
        method: 'GET',
        headers: {
          accept: 'application/json, text/plain, */*',
          'X-JWT-Assertion': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjEsInVzZXJOYW1lIjoiU3lzdGVtLVRva2VuIiwiYXV0aG9yaXRpZXMiOlsxXSwiaXNzIjoib2N0b3BpLWxhYnMuY29tIiwiZXhwIjoxODc5MzQwMTg1LCJpYXQiOjE3MjE2NjAxODV9.RR58MjQo9ECCW1aoMeJbtE4cvtENMfDegrt5MMzo0r0', 
        },
      });
  
      const data = await response.json(); 
  
      if (response.ok) {
        console.log("Profile data:", data); 
        setProfile(data.data); 
        // setUserTheme(data.data.theme);
      } else {
        console.error("Error fetching profile, status:", response.status);
        console.error("Error details:", data); // Log the error response body
        Alert.alert('Error', data.message || 'Failed to fetch profile!');
      }
    } catch (error) {
      console.error("Error fetching profile:", error); // Log the error
      Alert.alert('Error', 'An error occurred while fetching profile data.');
    }
  };



  

//   const themeStyles = theme === 'dark' ? darkTheme : lightTheme;


  return (
    <View style={styles.container}>
      <Button title="Get Profile" onPress={getProfile} color="#4CAF50" />
      
      {profile && (
        <ScrollView style={[styles.profileContainer]}>
          <Text style={[styles.profileTitle]}>Profile Information</Text>
          <Text style={[styles.profileText]}>Full Name: {profile.fullName}</Text>
          <Text style={[styles.profileText]}>Email: {profile.email}</Text>
          <Text style={[styles.profileText]}>Username: {profile.name}</Text>
          <Text style={[styles.profileText]}>Last Name: {profile.lastName}</Text>
          <Text style={[styles.profileText]}>Phone: {profile.phone || 'Not provided'}</Text>
          <Text style={[styles.profileText]}>Practice: {profile.practice}</Text>
          <Text style={[styles.profileText]}>Theme: {profile.theme}</Text>
          <Text style={[styles.profileText]}>Account Type: {profile.type}</Text>
          <Text style={[styles.profileText]}>Status: {profile.isActive === '1' ? 'Active' : 'Inactive'}</Text>
          <Text style={[styles.profileText]}>Created At: {new Date(profile.createdAt).toLocaleString()}</Text>
          <Text style={[styles.profileText]}>Last Seen At: {profile.lastSeenAt ? new Date(profile.lastSeenAt).toLocaleString() : 'Not available'}</Text>
          <Text style={[styles.profileText]}>Timezone: {profile.timezone || 'Not provided'}</Text>
          <Button title="Logout" onPress={handleLogout} />
          {/* <Button title="hello user" onPress={User} /> */}
        </ScrollView>
      )}
    </View>
  );
};



const lightTheme = {
    container: {
      backgroundColor: '#ffffff',
    },
    text: {
      color: '#000000',
    },
  };
  
  const darkTheme = {
    container: {
      backgroundColor: '#000000',
    },
    text: {
      color: '#ffffff',
    },
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  profileContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 15,
  },
  profileText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
});

export default HomeScreen;
