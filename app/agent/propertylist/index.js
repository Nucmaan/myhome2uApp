import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, SafeAreaView, ScrollView, StatusBar, Alert } from 'react-native';
import api from '../../Config/api';
import { useSelector } from 'react-redux';
import { useNavigation } from 'expo-router';

const Listings = () => {
  const [ownerList, setOwnerList] = useState([]);
  const user = useSelector((state) => state.user.user);
const Navigation = useNavigation();
  useEffect(() => {
    const getListings = async () => {
      try {
        const response = await api.get('/api/MyHome2U/property/getallproperty');
        const filteredListings = response.data.properties.filter(
          (listing) => listing.owner === user._id
        );
        setOwnerList(filteredListings);
      } catch (error) {
        console.log(error);
      }
    };

    getListings();
  }, [user._id]);

  const handleEdit = (propertyId) => {
   // console.log(`Edit property with ID: ${propertyId}`);
    Navigation.navigate('EditList',{
      propertyId: propertyId
    });

  };

  const handleDelete = async(propertyId) => {
    try {
      const response = await api.delete(`/api/MyHome2U/property/deleteproperty/${propertyId}`);
      if (response.status === 200) {
        setOwnerList(ownerList.filter((listing) => listing._id!== propertyId));
        Alert.alert('Success', 'Property deleted successfully.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProperty = () => {
    // Navigate to Add Property screen
    Navigation.navigate('AddProperty');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Listings</Text>
        <Button title="Add Property" onPress={handleAddProperty} />
      </View>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        horizontal={true}  // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false}  // Hide the horizontal scroll indicator
      >
        {ownerList.map((listing) => (
          <View key={listing._id} style={styles.listingContainer}>
            <Image source={{ uri: listing.image.url }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{listing.title}</Text>
              <Text>{listing.description}</Text>
              <Text>Address: {listing.address}, {listing.city}</Text>
              <Text>Price: ${listing.price}</Text>
              <Text>Deposit: ${listing.deposit}</Text>
              <Text>Bedrooms: {listing.bedrooms}</Text>
              <Text>Bathrooms: {listing.bathrooms}</Text>
              <Text>Parking: {listing.parking}</Text>
              <Text>Status: {listing.status}</Text>
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEdit(listing._id)} />
                <Button title="Delete" onPress={() => handleDelete(listing._id)} color="red" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0, // Ensure space for the status bar on Android
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingLeft: 10,
  },
  listingContainer: {
    marginRight: 20, // Spacing between the horizontal items
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    width: 300, // Fixed width for the card
    height: 500, // Fixed height for the card
    backgroundColor: '#fff', // Ensure consistent background color
    justifyContent: 'space-between', // Space between content and buttons
  },
  image: {
    width: '100%',
    height: 200, // Fixed height for the image
    borderRadius: 10,
  },
  details: {
    marginTop: 10,
    flex: 1, // Allow details to take up the remaining space within the fixed height
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});



export default Listings;
