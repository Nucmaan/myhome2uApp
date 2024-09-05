import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux'; 

const Welcome = () => {
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user); // Adjusted to ensure you access the correct property

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          if (user && user.role === "user") {
            navigation.replace('user');
          } else if (user && user.role === "agent") {
            navigation.replace('agent');
          } else if (user && user.role === "admin") {
            navigation.replace('admin');
          } else {
            navigation.replace('welcome');
          }
        } else {
          navigation.navigate("login");
        }
      } catch (error) {
        Alert.alert("An error occurred", error.response?.data?.message || "Server error. Try again later.");
      } finally {
        setLoading(false); 
      }
    };
    checkLoginStatus();
  }, [navigation, user]);

  return (
    loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to MyHome2U</Text>
        <Text style={styles.subtitle}>Find your perfect home, effortlessly.</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Black background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7D7D7D', // Gray text color
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF', // White button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: '#000000', // Black text color
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
