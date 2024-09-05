import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import {  useSelector } from 'react-redux';
import { useNavigation } from 'expo-router';

const AgentHome = () => {
  const user = useSelector((state) => state.user.user); // Ensure you access the correct property
 const navigation = useNavigation();

  return (
    <View>
   
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
         <Image 
          source={{ uri: user.avatar ? user.avatar.url : 'https://via.placeholder.com/100' }} 
          style={styles.avatar}  
        />
        <Text style={styles.headerText}>Welcome, {user?.name || 'User'}</Text>
      </View>

      <View style={styles.quickActionsContainer}>
        <TouchableOpacity
        onPress={() => {
          //navigation.navigate('Posts');
          navigation.navigate('propertylist', { screen: 'AddProperty' });
        } }
        style={styles.primaryButton}>
          <Text style={styles.buttonText}>Create Property</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => {
          //navigation.navigate('Posts');
          navigation.navigate('setting', { screen: 'Posts' });
        } 
        }
        style={styles.secondaryButton}>
          <Text style={styles.buttonText}>View Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Properties Listed</Text>
          <Text style={styles.statNumber}>12</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Available Properties</Text>
          <Text style={styles.statNumber}>5</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Properties Rented</Text>
          <Text style={styles.statNumber}>1</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Active Contracts</Text>
          <Text style={styles.statNumber}>1</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Monthly Revenue</Text>
          <Text style={styles.statNumber}>$2,500</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Upcoming Bookings</Text>
          <Text style={styles.statNumber}>5</Text>
        </View>
      </View>

    </View>
    </ScrollView>

     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#000000',
    borderRadius: 8,
    marginTop : 30
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  headerText: {
    fontSize: 17,
    color: '#FFFFFF',
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  secondaryButton: {
    backgroundColor: '#7D7D7D',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statTitle: {
    fontSize: 16,
    color: '#333333',
  },
  statNumber: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    marginTop: 'auto',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AgentHome;
