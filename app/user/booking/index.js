import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import api from '../../Config/api';

const BookingScreen = () => {
  const [userBooking, setUserBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getUserBooking = async () => {
      if (!user || !user._id) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          `/api/MyHome2U/Booking/GetUserBookings/${user._id}`
        );
        setUserBooking(response.data.bookings);
      } catch (error) {
        Alert.alert(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      getUserBooking();
    }
  }, [user, isFocused]);

  const cancelBooking = async (bookingId) => {
    try {
      await api.delete(`/api/MyHome2U/Booking/DeleteSingleBooking/${bookingId}`);
      setUserBooking((prevBookings) => prevBookings.filter((item) => item._id !== bookingId));
      Alert.alert('Success', 'Booking has been canceled.');
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return styles.statusPending;
      case 'Processing':
        return styles.statusProcessing;
      case 'Confirmed':
        return styles.statusConfirmed;
      case 'Cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
  };

  const renderBookingItem = ({ item }) => {
    const { property, status, visitingDate } = item;

    return (
      <View style={styles.card}>
        <Image source={{ uri: property.image.url }} style={styles.propertyImage} />
        <View style={styles.propertyInfo}>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.description}>{property.description}</Text>
          <Text style={styles.details}>{property.address}, {property.city}</Text>
          <Text style={styles.details}>Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}</Text>
          <Text style={styles.details}>Price: ${property.price} | Deposit: ${property.deposit}</Text>
          <Text style={[styles.status, getStatusStyle(status)]}>Status: {status}</Text>
          <Text style={styles.visitingDate}>Visiting Date: {new Date(visitingDate).toLocaleDateString()}</Text>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={() => cancelBooking(item._id)}>
          <Text style={styles.cancelButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <FlatList
          data={userBooking}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Light Background Color
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF', // White Background Color for Cards
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  propertyInfo: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#7D7D7D',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusPending: {
    color: '#FFA500', // Orange for Pending
  },
  statusProcessing: {
    color: '#1E90FF', // Dodger Blue for Processing
  },
  statusConfirmed: {
    color: '#32CD32', // Lime Green for Confirmed
  },
  statusCancelled: {
    color: '#FF0000', // Red for Cancelled
  },
  visitingDate: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: '#F44336', // Error Color for Cancel Button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF', // White Text Color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
