import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { persistStore, persistCombineReducers } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
  }

export const ConfigureStore  = () => {
    const store = createStore(
        persistCombineReducers(config, {
            dishes
        }),
        applyMiddleware(thunk , logger)
    );
    const persistor = persistStore(store)

    return { persistor, store };
}