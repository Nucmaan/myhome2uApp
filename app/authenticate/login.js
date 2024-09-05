import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { SignInSuccess }  from "../redux/user/UserSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../Config/api";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await api.post("/api/MyHome2U/user/login", {
        email,
        password,
      });
      if (response.status === 200) {
        dispatch(SignInSuccess(response.data.user));
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);
        if(response.data.user.role === "user"){
          navigation.replace('user');
        }else if(response.data.user.role === "agent"){
          navigation.replace('agent');
        }else if(response.data.user.role === "admin"){
          navigation.replace('admin');
        }else{
          navigation.replace('welcome');
        }
      
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to MyHome2U</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7D7D7D"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#7D7D7D"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Error message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Loading indicator or login button */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity onPress={() => navigation.navigate('forgetpassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E1E1E', // Darker gray input background
    color: '#FFFFFF', // White text color
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    color: '#F44336', // Error color (red)
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFFFFF', // White button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000000', // Black text color
    fontWeight: '600',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#7D7D7D', // Gray text color
    marginTop: 10,
  },
  registerText: {
    fontSize: 16,
    color: '#7D7D7D', // Gray text color
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
