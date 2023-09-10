// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import localStorageMiddleware from './localStorageMiddleware';

const preloadedState = JSON.parse(localStorage.getItem('reduxState')) || {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware), // Use getDefaultMiddleware
});

export default store;
