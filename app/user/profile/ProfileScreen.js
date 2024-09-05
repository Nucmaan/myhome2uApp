import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../../redux/user/UserSlice';
import { useNavigation } from 'expo-router';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Ensure you access the correct property
  const navigation = useNavigation();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.noUserText}>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <Image 
          source={{ uri: user.avatar ? user.avatar.url : 'https://via.placeholder.com/100' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile');
        } 
        }
        style={styles.detailItem}>
          <FontAwesome5 name="user-edit" size={24} color="#000000" />
          <Text style={styles.detailText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailItem}>
          <FontAwesome name="bell" size={24} color="#000000" />
          <Text style={styles.detailText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailItem}>
          <FontAwesome name="info-circle" size={24} color="#000000" />
          <Text style={styles.detailText}>About App</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            dispatch(logoutSuccess())
           // navigation.replace('authenticate');
           navigation.replace('authenticate', { screen: 'login' });
          } 
          }
          style={styles.detailItem}
        >
          <FontAwesome name="sign-out" size={24} color="#F44336" />
          <Text style={styles.detailText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Light Background Color
    padding: 16,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White Background for Header
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#7D7D7D', // Accent Color: Gray
    marginBottom: 10,
  },
  userName: {
    fontSize: 24, // Font Size for H1
    fontFamily: 'Roboto', // Primary Font
    fontWeight: '600',
    color: '#000000', // Primary Color: Black
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16, // Font Size for Body Text
    fontFamily: 'Roboto',
    color: '#7D7D7D', // Accent Color: Gray
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF', // White Background for Details
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Light Gray Border Color
  },
  detailText: {
    fontSize: 16, // Font Size for Detail Text
    fontFamily: 'Roboto',
    color: '#000000', // Primary Color: Black
    marginLeft: 10,
  },
  noUserText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#7D7D7D',
  },
});

export default ProfileScreen;
