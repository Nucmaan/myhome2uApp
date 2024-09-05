import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView, Button, Alert, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import api from '../../Config/api';

const DetailsScreen = () => {
    const route = useRoute();
    const { id } = route.params;
    const [houseInfo, setHouseInfo] = useState(null);
    const [visitingDate, setVisitingDate] = useState(new Date());
    const [dateChanged, setDateChanged] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation();
    const [hasBooked, setHasBooked] = useState(false);
    const { user } = useSelector((state) => state.user);

    const getUserBooking = useCallback(async () => {
        try {
            const response = await api.get(`/api/MyHome2U/Booking/GetUserBookings/${user?._id}`);
            const bookings = response.data.bookings || [];
            
            // Check if the user has already booked this property
            const alreadyBooked = bookings.some(
                booking => booking.property._id === houseInfo?._id
            );
            setHasBooked(alreadyBooked);
        } catch (error) {
            console.log(error);
        }
    }, [user?._id, houseInfo?._id]);

    useEffect(() => {
        const getHouseInfo = async () => {
            try {
                const response = await api.get(`/api/MyHome2U/property/getsingleproperty/${id}`);
                setHouseInfo(response.data.property);
            } catch (error) {
                Alert.alert(error.response?.data?.message || "An error occurred");
            }
        };

        getHouseInfo();
    }, [id]);

    useEffect(() => {
        if (houseInfo) {
            getUserBooking();
        }
    }, [houseInfo, getUserBooking]);

    const handleBooking = async () => {
        if (!houseInfo) return;

        if (user._id === houseInfo.owner) {
            Alert.alert("You can't book your own property.");
            return;
        }

        if (user.role === 'admin' || user.role === 'agent') {
            Alert.alert("You can't make a booking because you are an Administrator.");
            return;
        }

        if (hasBooked) {
            Alert.alert("You can't book this property because you already have a booking.");
            return;
        }

        if (!dateChanged) {
            Alert.alert("Please select a visiting date.");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (visitingDate <= today) {
            Alert.alert("Please select a valid future date for your visit.");
            return;
        }

        try {
            const response = await api.post("/api/MyHome2U/Booking/AddNewBooking/", {
                property: id,
                user: user._id,
                visitingDate: visitingDate,
            });

            if (response.status === 201) {
                Alert.alert("Booking Successful!");
                navigation.navigate("Index");
            } else {
                Alert.alert("Failed to Book! Please try again.",response);
                //console.log(response);
            }
        } catch (error) {
            Alert.alert(error.response?.data?.message || "An error occurred");
        }
    };

    if (!houseInfo) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            {houseInfo.image ? (
                <Image
                    style={styles.image}
                    source={{ uri: houseInfo.image.url }}
                />
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>No Image Available</Text>
                </View>
            )}

            {/* Property Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{houseInfo.title}</Text>
                <Text style={styles.description}>{houseInfo.description}</Text>

                {/* Details with Icons */}
                <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={24} color="#1D4ED8" />
                    <Text style={styles.detailText}>Address: {houseInfo.address}</Text>
                </View>
                <View style={styles.detailRow}>
                    <FontAwesome5 name="city" size={24} color="#4B5563" />
                    <Text style={styles.detailText}>City: {houseInfo.city}</Text>
                </View>
                <View style={styles.detailRow}>
                    <FontAwesome5 name="dollar-sign" size={24} color="#1D4ED8" />
                    <Text style={styles.detailTextBold}>Price: ${houseInfo.price}</Text>
                </View>
                <View style={styles.detailRow}>
                    <FontAwesome5 name="dollar-sign" size={24} color="#1D4ED8" />
                    <Text style={styles.detailText}>Deposit: ${houseInfo.deposit}</Text>
                </View>
                <View style={styles.detailRow}>
                    <FontAwesome5 name="bed" size={24} color="#1D4ED8" />
                    <Text style={styles.detailText}>Bedrooms: {houseInfo.bedrooms}</Text>
                </View>
                <View style={styles.detailRow}>
                    <FontAwesome5 name="bath" size={24} color="#1D4ED8" />
                    <Text style={styles.detailText}>Bathrooms: {houseInfo.bathrooms}</Text>
                </View>
                <View style={styles.detailRow}>
                    <MaterialIcons name="local-parking" size={24} color="#1D4ED8" />
                    <Text style={styles.detailText}>Parking: {houseInfo.parking}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="home-outline" size={24} color="#1D4ED8" />
                    <Text style={styles.detailText}>Type: {houseInfo.houseType}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="information-circle-outline" size={24} color="#1D4ED8" />
                    <Text style={styles.detailText}>Status: {houseInfo.status}</Text>
                </View>

                {/* Date Picker Button */}
                <View style={styles.datePickerContainer}>
                    <Button title="Select Visiting Date" onPress={() => setShowDatePicker(true)} color="#1D4ED8" />
                    <Text style={styles.selectedDateText}>
                        Selected Date: {visitingDate.toDateString()}
                    </Text>
                </View>

                {/* Date Picker Modal */}
                {showDatePicker && (
                    <DateTimePicker
                        value={visitingDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setVisitingDate(selectedDate);
                                setDateChanged(true);
                            }
                        }}
                    />
                )}

                <Pressable
                    style={styles.bookNowButton}
                    onPress={handleBooking}
                >
                    <Text style={styles.bookNowText}>Book Now</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: 250,
        backgroundColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        color: '#6B7280',
    },
    detailsContainer: {
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    detailText: {
        fontSize: 16,
        color: '#1F2937',
        marginLeft: 8,
    },
    detailTextBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginLeft: 8,
    },
    datePickerContainer: {
        marginVertical: 16,
    },
    selectedDateText: {
        fontSize: 16,
        color: '#4B5563',
        marginTop: 8,
    },
    bookNowButton: {
        backgroundColor: '#1D4ED8',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookNowText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DetailsScreen;
