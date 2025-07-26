import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';

import uiReducer from '../routes/Redux/ui/uiSlice';
import posterReducer from '../routes/Redux/posterReducer/posterSlice';

// 1. Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// 2. Root reducer
const rootReducer = combineReducers({
  ui: uiReducer,
  auth: posterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Middleware
const middleware = [ logger];

if (import.meta.env.VITE_MODE === 'development') {
  middleware.push(logger); // only log in dev
}

// 4. Store config
export const store = configureStore({
  reducer: persistedReducer,
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger), // ✅ Only use logger or other custom middleware

});

// 5. Persistor
export const persistor = persistStore(store);

// 6. Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
