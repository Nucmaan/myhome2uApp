import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import api from '../../Config/api';
import { useNavigation } from 'expo-router';

const AddProperty = () => {
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

  const handleSubmit = async() => {

    if (!title || !description || !address || !city || !price || !bedrooms || !bathrooms || !parking || !deposit || !image) {
      Alert.alert("Please fill all the fields");
      return;
    }

    setIsLoading(true);

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("price", price);
    formData.append("deposit", deposit);
    formData.append("houseType", houseType);
    formData.append("parking", parking);
    formData.append('image', {
      uri: image,
      type: 'image/jpeg', // Ensure the correct MIME type
      name: `property.${image.split('.').pop()}`, // Extract file extension from the URI
    });
    formData.append("owner", user._id);
    formData.append("status", status);

    try {
      const response = await api.post(
        "/api/MyHome2U/property/addproperty",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Property added successfully!");
        navigation.navigate("index");
      }
      else {
        Alert.alert("Failed to add property. Please try again.");
      }
      setImage(null);
      setTitle('');
      setDescription('');
      setAddress('');
      setCity('');
      setPrice('');
      setHouseType('Rent');
      setBedrooms('');
      setBathrooms('');
      setParking('');
      setDeposit('');
      setStatus('Available');

    } catch (error) {
      console.error(error);
      if (error.response) {
        Alert.alert(error.response.data.message || "An error occurred on the server.");
      } else {
        Alert.alert("Network Error. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Add Property</Text>

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
            placeholder="Enter deposit"
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
          {isLoading ? (
            <Text style={styles.submitButtonText}>Adding..........</Text>

          ) : (
            <Text style={styles.submitButtonText}>Add Property</Text>
          )}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Dark text color
    marginTop : 30
  },
  formGroup: {
    marginBottom: 16,
    backgroundColor: '#fff', // White background for form groups
    borderRadius: 8,
    padding: 16,
    elevation: 2, 
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555', 
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fafafa', 
    width: '100%',
  },
  textArea: {
    height: 100,
    borderColor: '#ddd', 
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    textAlignVertical: 'top',
    width: '100%',
  },
  picker: {
    height: 40,
    borderColor: '#ddd', 
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
    borderColor: '#ddd', 
    borderWidth: 1,
  },
  imagePickerButton: {
    backgroundColor: '#007bff', 
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  imagePickerButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007bff', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  submitButtonDisabled: {
    backgroundColor: '#6c757d', 
  },
  submitButtonText: {
    color: '#fff', 
    fontSize: 18,
  },
});

export default AddProperty;
