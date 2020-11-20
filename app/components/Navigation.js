import 'react-native-gesture-handler';
import React from 'react';

import {
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoginSuccess from './screens/LoginSuccess';
import ApartmentListScreen from './screens/ApartmentListScreen/ApartmentListScreen';
import ApartmentScreen from './screens/ApartmentScreen';


const Stack = createStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Apartment'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='ApartmentList' component={ApartmentListScreen} />
            <Stack.Screen name='Apartment' component={ApartmentScreen} />
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='LoginSuccess' component={LoginSuccess} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;
