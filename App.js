/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import HomeComponent from './components/HomeComponent';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

function App () {

  return (
    <Provider store={store}>
      <PersistGate 
        loading={<Loading />}
        persistor={persistor}>
          <HomeComponent/> 
      </PersistGate>
    </Provider>
);

}

export default App;
