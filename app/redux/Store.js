import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/UserSlice";

const persistConfig = {
    key: "root", 
    storage: AsyncStorage, 
  };

  const rootReducer = combineReducers({
    user: userReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(Store);