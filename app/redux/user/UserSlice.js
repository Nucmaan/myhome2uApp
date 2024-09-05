import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  
    SignInSuccess: (state, action) => {
      state.user = action.payload;
    },
 
    logoutSuccess: (state) => {
      state.user = null;
      AsyncStorage.removeItem('token');
    },

  userUpdateSuccess : (state, action ) => {
      state.user = action.payload;
  },

  },
});

export const { logoutSuccess,  SignInSuccess,  userUpdateSuccess  } = UserSlice.actions;

export default UserSlice.reducer;
