import 'react-native-gesture-handler';
import React from 'react';

import {
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import TestScreen from './TestScreen';
import LoginScreen from './LoginScreen';
import LoginSuccess from './LoginSuccess';


const Stack = createStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='LoginSuccess'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Test' component={TestScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='LoginSuccess' component={LoginSuccess} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;
