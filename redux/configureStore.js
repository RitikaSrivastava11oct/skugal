import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { quizzes } from './quizzes';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
  }

export const ConfigureStore  = () => {
    const store = createStore(
        persistCombineReducers(config, {
            quizzes
        }),
        applyMiddleware(thunk , logger)
    );
    const persistor = persistStore(store)

    return { persistor, store };
}