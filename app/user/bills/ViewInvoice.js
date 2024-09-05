import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView, StyleSheet } from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import api from '../../Config/api';

const ViewInVoice = () => {
  const route = useRoute();
  const { id } = route.params;
  const isFocused = useIsFocused();
  const [billInfo, setBillInfo] = useState({});

  useEffect(() => {
    const getSingleBill = async () => {
      try {
        const response = await api.get(`/api/MyHome2U/bills/GetSingleBill/${id}`);
        setBillInfo(response.data.bill);
      } catch (error) {
        Alert.alert(error.response?.data?.message || "An error occurred");
      }
    };

    if (isFocused) {
      getSingleBill();
    }
  }, [isFocused]);

  const handleDownload = async () => {
    try {
      const html = `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8f9fa;
              color: #212529;
            }
            .container {
              padding: 20px;
              margin: auto;
              max-width: 800px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
            }
            .invoice-info {
              margin-bottom: 20px;
            }
            .invoice-info div {
              margin-bottom: 5px;
            }
            .invoice-info div span {
              font-weight: bold;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .items-table th, .items-table td {
              border: 1px solid #dee2e6;
              padding: 10px;
              text-align: left;
            }
            .items-table th {
              background-color: #007bff;
              color: #ffffff;
            }
            .items-table td {
              background-color: #f8f9fa;
            }
            .total-summary {
              text-align: right;
              font-size: 18px;
              margin-top: 20px;
            }
            .total-summary div {
              margin-bottom: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
              color: #6c757d;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Invoice</h1>
            </div>
            <div class="invoice-info">
              <div><span>Invoice ID:</span> ${billInfo._id}</div>
              <div><span>Date:</span> ${new Date(billInfo.createdAt).toLocaleDateString()}</div>
              <div><span>Due Date:</span> ${new Date(billInfo.dueDate).toLocaleDateString()}</div>
              <div><span>Status:</span> ${billInfo.status}</div>
            </div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rent</td>
                  <td>$${billInfo.amount}</td>
                </tr>
                <tr>
                  <td>Utilities</td>
                  <td>$${billInfo.utilities}</td>
                </tr>
              </tbody>
            </table>
            <div class="total-summary">
              <div><span>Subtotal:</span> $${billInfo.amount + billInfo.utilities}</div>
              <div><span>Total:</span> $${billInfo.total}</div>
            </div>
            <div class="footer">
              <p>Thank you!</p>
              <p>This invoice is a computer-generated payment that will be sent to the customer through the gateway, no need for a signature.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      const fileUri = `${FileSystem.documentDirectory}invoice.pdf`;

      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Invoice Details</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Bill Information</Text>
          <Text style={styles.text}>Amount: ${billInfo.amount}</Text>
          <Text style={styles.text}>Utilities: ${billInfo.utilities}</Text>
          <Text style={styles.text}>Total: ${billInfo.total}</Text>
          <Text style={styles.text}>Due Date: {new Date(billInfo.dueDate).toLocaleDateString()}</Text>
          <Text style={styles.text}>
            Status: 
            <Text style={billInfo.status === 'Paid' ? styles.statusPaid : styles.statusUnpaid}>
              {billInfo.status}
            </Text>
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={handleDownload}
        >
          <MaterialIcons name="download" size={24} color="white" />
          <Text style={styles.downloadText}>Download Invoice</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 24,
    color: 'black',
  },
  infoContainer: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 8,
  },
  statusPaid: {
    color: '#22c55e',
    fontWeight: 'bold',
  },
  statusUnpaid: {
    color: '#f87171',
    fontWeight: 'bold',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  downloadText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 8,
  },
});

export default ViewInVoice;
