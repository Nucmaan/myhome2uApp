import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import api from '../../Config/api';

export default function UserBills() {
  const [userBills, setUserBills] = useState([]);
  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState(null);

  useEffect(() => {
    const getUserBills = async () => {
      try {
        const response = await api.get(`/api/MyHome2U/bills/getUserBills/${user._id}`);
        setUserBills(response.data.bills || []); 
      } catch (error) {
        Alert.alert(error.response?.data?.message || "An error occurred");
      }
    };

    if (isFocused) {
      getUserBills();
    }
  }, [isFocused]);

  const PayNow = async () => {
    if (!paymentMethod) {
      Alert.alert("Please select a payment method.");
      return;
    }

    try {
      const response = await api.put(`/api/MyHome2U/bills/updateUserBill/${selectedBillId}`, {
        paymentMethod,
      });

      if (response.status === 200) {
        Alert.alert("Payment updated successfully");
        navigation.navigate('index');
      } else {
        Alert.alert("Failed to process payment.");
      }

    } catch (error) {
      Alert.alert(error.response?.data?.message || "An error occurred");
    } finally {
      setModalVisible(false);
    }
  };

  const openPaymentModal = (billId) => {
    setSelectedBillId(billId);
    setModalVisible(true);
  };

  // Filter and sort bills
  const sortedBills = [...userBills].sort((a, b) => {
    if (a.status === 'Pending' && b.status !== 'Pending') return -1;
    if (b.status === 'Pending' && a.status !== 'Pending') return 1;
    return 0;
  });

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f4f4f4' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333333', marginBottom: 20, marginTop : 20}}>Bills</Text>

      {sortedBills.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 18, color: '#7D7D7D' }}>You don't have any payments or bills.</Text>
        </View>
      ) : (
        sortedBills.map((bill) => (
          <View key={bill._id} style={{ marginBottom: 20, padding: 15, backgroundColor: '#ffffff', borderRadius: 10, shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
            <Text style={{ marginBottom: 5, fontSize: 16, color: '#333333' }}>ID: {bill._id}</Text>
            <Text style={{ marginBottom: 5, fontSize: 16, color: '#333333' }}>Description: {bill.Description}</Text>
            <Text style={{ marginBottom: 5, fontSize: 16, color: '#333333' }}>Amount: ${bill.amount}</Text>
            <Text style={{ marginBottom: 5, fontSize: 16, color: '#333333' }}>Utilities: ${bill.utilities}</Text>
            <Text style={{ marginBottom: 5, fontSize: 16, color: '#333333' }}>Total: ${bill.total}</Text>
            <Text style={{ marginBottom: 5, fontSize: 16, color: '#333333' }}>Due Date: {new Date(bill.dueDate).toLocaleDateString()}</Text>
            <Text style={{ marginBottom: 5, fontSize: 16, color: '#333333' }}>Payment Date: {bill.paymentDate ? new Date(bill.paymentDate).toLocaleDateString() : 'N/A'}</Text>
            <Text style={{ marginBottom: 5, fontSize: 16, color: '#333333' }}>Payment Method: {bill.paymentMethod || 'N/A'}</Text>
            <Text style={{ marginBottom: 10, fontSize: 16, color: bill.status === 'Paid' ? '#10b981' : '#ef4444' }}>
              Status: {bill.status}
            </Text>
            {bill.status === 'Pending' ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: '#4f46e5', // Indigo color
                  borderRadius: 5,
                }}
                onPress={() => openPaymentModal(bill._id)}
              >
                <MaterialIcons name="payment" size={20} color="white" />
                <Text style={{ color: 'white', marginLeft: 10 }}>Pay Now</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: '#4f46e5',
                  borderRadius: 5,
                }}
                onPress={() => 
                  navigation.navigate("ViewInvoice", { id: bill._id })
                }
              >
                <FontAwesome name="file-pdf-o" size={20} color="white" />
                <Text style={{ color: 'white', marginLeft: 10 }}>View Invoice</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}

      {/* Payment Method Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 300, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333333' }}>Select Payment Method</Text>
            {['Credit Card', 'Bank Transfer', 'Cash'].map((method) => (
              <TouchableOpacity
                key={method}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 5,
                  marginBottom: 10,
                  backgroundColor: paymentMethod === method ? '#4f46e5' : 'white',
                }}
                onPress={() => setPaymentMethod(method)}
              >
                <Text style={{ color: paymentMethod === method ? 'white' : '#333333' }}>{method}</Text>
              </TouchableOpacity>
            ))}
            <Pressable
              style={{
                marginTop: 20,
                padding: 10,
                backgroundColor: '#4f46e5',
                borderRadius: 5,
              }}
              onPress={PayNow}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Proceed with Payment</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
