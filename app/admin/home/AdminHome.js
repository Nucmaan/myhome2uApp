import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/user/UserSlice';

const AdminHome = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.userText}>Home Screen {user.role}</Text>
      <Pressable
        style={styles.logoutButton}
        onPress={() => dispatch(logoutSuccess())}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userText: {
    fontSize: 18,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AdminHome;
