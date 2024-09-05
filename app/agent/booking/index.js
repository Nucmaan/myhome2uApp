import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import api from '../../Config/api';
import { useNavigation } from 'expo-router';

const BookingScreen = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  const Navigation = useNavigation();
  
  useEffect(() => {
    const getUserBooking = async () => {
      try {
        const response = await api.get(
          `/api/MyHome2U/Booking/GetAgentBookings/${user._id}`
        );
        setBookingsData(response.data.agentBookings);
      } catch (error) {
        Alert.alert(error.response?.data?.message || "An error occurred");
      }
    };

    if (isFocused) {
      getUserBooking();
    }
  }, [user, isFocused]);

  const handleStatusChange = async(bookingId, status) => {
    // Implement API call to update status
    //console.log(`Update booking ${bookingId} to status ${newStatus}`);
    // Update local state or refetch data after successful update
    try {
      const response = await api.put(`/api/MyHome2U/Booking/updateBooking/${bookingId}`,{ status });
  
        Alert.alert('Success', 'Booking status updated successfully.');
        //getUserBooking(); // Refetch data after successful update
        if(response.status === 200){
          //getUserBooking(); // Refetch data after successful update
          Alert.alert('Success', 'Booking status updated successfully.'); 
        }
    
    } catch (error) {
      Alert.alert(error.response?.data?.message || "An error occurred");
    }


  };

  const handleCancel = async(bookingId) => {
    try {
      await api.delete(`/api/MyHome2U/Booking/DeleteSingleBooking/${bookingId}`);
      Alert.alert('Success', 'Booking has been canceled.');

    } catch (error) {
     
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
      
    <ScrollView style={styles.container}>
      {bookingsData.map((booking) => (
        <View key={booking._id} style={styles.bookingCard}>
          <Image
            source={{ uri: booking.property.image.url }}
            style={styles.propertyImage}
          />
          <View style={styles.bookingDetails}>
            <Text style={styles.propertyTitle}>{booking.property.title}</Text>
            <Text style={styles.propertyDescription}>{booking.property.description}</Text>
            <Text style={styles.bookingDate}>Visiting Date: {new Date(booking.visitingDate).toDateString()}</Text>
            <Text style={styles.bookingStatus}>Status: {booking.status}</Text>
            <Text style={styles.userInfo}>User: {booking.user.name} (Phone: {booking.user.phone})</Text>

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleStatusChange(booking._id, 'Confirmed')}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleStatusChange(booking._id, 'processing')}
              >
                <Text style={styles.buttonText}>Processing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => handleCancel(booking._id)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
    marginTop:17
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  propertyImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  bookingDetails: {
    marginBottom: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  propertyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bookingDate: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  bookingStatus: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#000', // Primary color for buttons
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#D9534F', // Red color for cancel button
    marginRight: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default BookingScreen;
