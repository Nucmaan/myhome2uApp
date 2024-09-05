// app/_layout.js
import { Provider } from 'react-redux';
import { Slot } from 'expo-router';
import { persistor, Store } from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Slot />
        <StatusBar
          barStyle="dark-content" // Set the text color to dark
          backgroundColor="#FFFFFF" // Set the background color to white
        />
      </PersistGate>
    </Provider>
  );
}
