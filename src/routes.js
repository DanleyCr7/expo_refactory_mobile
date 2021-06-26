import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import MenuScreen from './pages/menu';
import OrderScreen from './pages/order';
import LoginScreen from './pages/login';

const AppRoutes = () => (
    <Stack.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: '#000'
            },
        }}
    >
        <Stack.Screen 
            name="Capus Parnaíba"
            component={LoginScreen}
        />
         <Stack.Screen 
            name="Menu"
            component={MenuScreen}
        />
         <Stack.Screen 
            name="Order"
            component={OrderScreen}
        />

    </Stack.Navigator>
)

export default AppRoutes;
