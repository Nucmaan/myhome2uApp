import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import api from '../../Config/api';
import { useNavigation } from 'expo-router';

export default function UserHome() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Rent', 'Buy'
  const navigation = useNavigation();

  useEffect(() => {
    const getListings = async () => {
      try {
        const response = await api.get('/api/MyHome2U/property/getallproperty');
        setProperties(response.data.properties);
      } catch (error) {
        console.log(error);
      }
    };
    getListings();
  }, []);

  // Function to filter and search properties
  const getFilteredProperties = () => {
    return properties
      .filter(property => {
        if (filter === 'All') return true;
        return property.houseType === filter;
      })
      .filter(property => {
        if (!search) return true;
        return property.city.toLowerCase().includes(search.toLowerCase()) || 
               property.title.toLowerCase().includes(search.toLowerCase());
      });
  };

  const handleViewDetails = (id) => {
    navigation.navigate('ViewDetails', { id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={require('../../../assets/myhome2u-icon.png')} // Replace with your logo path
            style={styles.logo}
          />
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="#FFFFFF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search properties..."
              placeholderTextColor="#FFFFFF"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <TouchableOpacity
            style={[styles.categoryButton, filter === 'Rent' && styles.activeCategoryButton]}
            onPress={() => setFilter('Rent')}
          >
            <Text style={styles.categoryButtonText}>Rent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, filter === 'Buy' && styles.activeCategoryButton]}
            onPress={() => setFilter('Buy')}
          >
            <Text style={styles.categoryButtonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, filter === 'All' && styles.activeCategoryButton]}
            onPress={() => setFilter('All')}
          >
            <Text style={styles.categoryButtonText}>All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuredContainer}>
          {getFilteredProperties().map((property) => (
            <View key={property._id} style={styles.propertyCard}>
              <Image source={{ uri: property.image.url }} style={styles.propertyImage} />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyTitle}>{property.city}</Text>
               
                <Text style={styles.propertyPrice}>${property.price} / month</Text>
                <Text style={styles.propertyInfo}>{property.bedrooms} Beds • {property.bathrooms} Baths</Text>
                <TouchableOpacity 
                  onPress={() => handleViewDetails( property._id)}
                  style={styles.viewButton}
                >
                  <Text style={styles.viewButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
              <Text  style={styles.houseTypeIcon}>{property.houseType}</Text>
            </View>
          ))}
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <FontAwesome5 name="info-circle" size={24} color="#7D7D7D" />
          <Text style={styles.footerText}>Need help? Contact support</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Light Background Color
    paddingTop: 28, // Add padding at the top to accommodate status bar
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#000000', // Primary Color: Black
    padding: 20,
    borderRadius: 8,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logo: {
    width: 100,
    height: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333', // Dark Background for Search Bar
    borderRadius: 8,
    flex: 1,
    marginLeft: 16,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: '#FFFFFF', // White Text Color
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#000000', // Primary Color: Black
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  activeCategoryButton: {
    backgroundColor: '#333333', // Slightly Different Color for Active Button
  },
  categoryButtonText: {
    color: '#FFFFFF', // Secondary Color: White
    fontSize: 16,
    fontWeight: '600',
  },
  featuredContainer: {
    marginBottom: 16,
  },
  propertyCard: {
    backgroundColor: '#FFFFFF', // White Background for Cards
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative', // Ensure absolute positioning of child elements
  },
  propertyImage: {
    width: '100%',
    height: 180,
  },
  propertyDetails: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 20, // Font Size for Property Title
    fontWeight: '600',
    color: '#000000', // Primary Color: Black
    marginBottom: 4,
  },
  propertyHouseType: {
    fontSize: 14, // Font Size for House Type
    fontWeight: '400',
    color: '#007BFF', // Accent Color: Blue
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 18, // Font Size for Property Price
    fontWeight: '600',
    color: '#000000', // Primary Color: Black
    marginBottom: 4,
  },
  propertyInfo: {
    fontSize: 14, // Font Size for Property Info
    color: '#7D7D7D', // Accent Color: Gray
    marginBottom: 12,
  },
  viewButton: {
    backgroundColor: '#000000', // Primary Color: Black
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  viewButtonText: {
    color: '#FFFFFF', // Secondary Color: White
    fontSize: 16, // Font Size for Button Text
    fontWeight: '600',
  },
  houseTypeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 75,
    height: 40,
    backgroundColor: '#333333', // Dark Background for House Type Icon
    color: "#FFFF",
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 20,
  },
  footerText: {
    color: '#7D7D7D',
    fontSize: 16,
    marginLeft: 8,
  },
});
