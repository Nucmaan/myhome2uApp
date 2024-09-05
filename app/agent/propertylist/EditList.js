import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import api from '../../Config/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditList = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [houseType, setHouseType] = useState('Rent');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [parking, setParking] = useState('');
  const [deposit, setDeposit] = useState('');
  const [status, setStatus] = useState('Available');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user.user); // Ensure you access the correct property
  const navigation = useNavigation();
  const route = useRoute();
  const { propertyId } = route.params; // Get property ID from route params

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await api.get(`api/MyHome2U/property/getsingleproperty/${propertyId}`);
        const property = response.data.property; // Access the property data directly
        console.log(property); // Debug: log the fetched property data

        setTitle(property.title || '');
        setDescription(property.description || '');
        setAddress(property.address || '');
        setCity(property.city || '');
        setPrice(property.price?.toString() || '');
        setHouseType(property.houseType || 'Rent');
        setBedrooms(property.bedrooms?.toString() || '');
        setBathrooms(property.bathrooms?.toString() || '');
        setParking(property.parking?.toString() || '');
        setDeposit(property.deposit?.toString() || '');
        setStatus(property.status || 'Available');
        setImage(property.image?.url || null); // Assuming the image URL is returned
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to load property data');
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !address || !city || !price || !bedrooms || !bathrooms || !parking || !deposit || !image) {
      Alert.alert('Please fill all the fields');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('price', price);
    formData.append('deposit', deposit);
    formData.append('houseType', houseType);
    formData.append('parking', parking);
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: `property.${image.split('.').pop()}`,
    });
    formData.append('owner', user._id);
    formData.append('status', status);

    try {
      const response = await api.put(
        `/api/MyHome2U/property/updatesingleproperty/${propertyId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Property updated successfully!');
        navigation.navigate('index');
      } else {
        Alert.alert('Failed to update property. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error updating property.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Edit Property</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter property title"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder="Enter property description"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter property address"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter city"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="Enter price"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Deposit</Text>
          <TextInput
            style={styles.input}
            value={deposit}
            onChangeText={setDeposit}
            keyboardType="numeric"
            placeholder="Enter deposit amount"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>House Type</Text>
          <Picker
            selectedValue={houseType}
            style={styles.picker}
            onValueChange={(itemValue) => setHouseType(itemValue)}
          >
            <Picker.Item label="Rent" value="Rent" />
            <Picker.Item label="Buy" value="Buy" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Status</Text>
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Available" value="Available" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Sold" value="Sold" />
            <Picker.Item label="Rented" value="Rented" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bedrooms</Text>
          <TextInput
            style={styles.input}
            value={bedrooms}
            onChangeText={setBedrooms}
            keyboardType="numeric"
            placeholder="Enter number of bedrooms"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bathrooms</Text>
          <TextInput
            style={styles.input}
            value={bathrooms}
            onChangeText={setBathrooms}
            keyboardType="numeric"
            placeholder="Enter number of bathrooms"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Parking</Text>
          <TextInput
            style={styles.input}
            value={parking}
            onChangeText={setParking}
            keyboardType="numeric"
            placeholder="Enter number of parking spots"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Upload Image</Text>
          <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
            <Text style={styles.imagePickerButtonText}>Pick an image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Updating...' : 'Update Property'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 20, // Add some space at the bottom of the scroll view
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 35
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
  },
  imagePickerButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  imagePickerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditList;
