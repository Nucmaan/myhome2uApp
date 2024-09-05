import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Image, Pressable, ScrollView, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import api from '../../Config/api';
import { userUpdateSuccess } from "../../redux/user/UserSlice";

const EditProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`/api/MyHome2U/user/getSingleUser/${user._id}`);
        const userData = response.data.user;
        setImage(userData.avatar.url);
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone.toString()); 
      } catch (error) {
        Alert.alert(error.response?.data?.message || "An error occurred");
      }
    };

    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

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

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (password) {
        formData.append('password', password); 
      }
      formData.append('phone', phone);

      if (image && image !== user.avatar.url) {
        formData.append('avatar', {
          uri: image,
          type: 'image/jpeg',
          name: `profile.${image.split('.').pop()}`,
        });
      }

      const response = await api.put(`/api/MyHome2U/user/updateSingleUser/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        dispatch(userUpdateSuccess(response.data.user));
        Alert.alert("Profile updated successfully");
        Navigation.navigate("ProfileScreen");
      } else {
        Alert.alert(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      Alert.alert(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.imageLabel}>Profile Picture</Text>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text>Select Image</Text>
          </View>
        )}
        <Button title="Select Image" onPress={pickImage} color={styles.button.color} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your new password"
          secureTextEntry={true}
        />
      </View>

      <Pressable
        style={styles.updateButton}
        onPress={handleUpdate}
      >
        <Text style={styles.updateButtonText}>
          {loading ? 'Processing please wait...' : 'Update Profile'}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imageLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  updateButton: {
    backgroundColor: '#1D4ED8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    color: '#1D4ED8', // Button color
  }
});

export default EditProfileScreen;
