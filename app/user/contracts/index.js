import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import api from '../../Config/api';

const ContractsScreen = () => {
  const [userContract, setUserContract] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getUserContract = async () => {
      if (!user || !user._id) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          `/api/MyHome2U/contract/getUserContracts/${user._id}`
        );
        setUserContract(response.data.contracts);
      } catch (error) {
        Alert.alert(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      getUserContract();
    }
  }, [user, isFocused]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return styles.statusActive;
      case 'Terminated':
        return styles.statusTerminated;
      case 'Inactive':
        return styles.statusInactive;
      default:
        return styles.statusDefault;
    }
  };

  const renderContractItem = ({ item }) => {
    const { property, status, startDate, endDate, monthlyRent, deposit } = item;

    return (
      <View style={styles.card}>
        <Image source={{ uri: property.image.url }} style={styles.propertyImage} />
        <View style={styles.propertyInfo}>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.description}>{property.description}</Text>
          <Text style={styles.details}>{property.address}, {property.city}</Text>
          <Text style={styles.details}>Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}</Text>
          <Text style={styles.details}>Price: ${property.price} | Deposit: ${deposit}</Text>
          <Text style={styles.details}>Monthly Rent: ${monthlyRent}</Text>
          <Text style={styles.details}>Start Date: {new Date(startDate).toLocaleDateString()}</Text>
          <Text style={styles.details}>End Date: {new Date(endDate).toLocaleDateString()}</Text>
          <Text style={[styles.status, getStatusStyle(status)]}>Status: {status}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Contracts</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <FlatList
          data={userContract}
          renderItem={renderContractItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  paddingTop: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
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
    marginTop: 8,
  },
  statusActive: {
    color: '#32CD32', // Lime Green for Active
  },
  statusTerminated: {
    color: '#FF0000', // Red for Terminated
  },
  statusInactive: {
    color: '#FFA500', // Orange for Inactive
  },
  statusDefault: {
    color: '#000000', // Default black color
  },
});

export default ContractsScreen;
