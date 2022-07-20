import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import rootReducer from './reducers';

const PERSISTED_KEYS: string[] = ['auth', 'profile', 'cartItems'];

const persistConfig = {
  key: 'root',
  whitelist: PERSISTED_KEYS,
  storage,
};

const store = configureStore({
  // reducer: rootReducer,
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    return middleware;
  },
  devTools:
    process.env.REACT_APP_NODE_ENV === 'development' || process.env.REACT_APP_NODE_ENV === 'local',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
