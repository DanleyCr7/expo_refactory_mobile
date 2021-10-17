import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import StackRoutes from './src/routes';
import store from './src/store'
import FlashMessage from 'react-native-flash-message';

const Routes = () => (
  <NavigationContainer>
    <Provider store={store}>
      <StackRoutes />
      <FlashMessage position="bottom" />
    </Provider>
  </NavigationContainer>
)

export default Routes;