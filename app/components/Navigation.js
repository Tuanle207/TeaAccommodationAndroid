import 'react-native-gesture-handler';
import React from 'react';

import {
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoginSuccess from './screens/LoginSuccess';
import UserScreen from './screens/UserScreen';
import SignUpScreen from './screens/SignUpScreen';


const Stack = createStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='SignUp'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='LoginSuccess' component={LoginSuccess} />
            <Stack.Screen name='User' component={UserScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;
