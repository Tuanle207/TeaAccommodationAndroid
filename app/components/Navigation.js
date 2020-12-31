import 'react-native-gesture-handler';
import React from 'react';

import {
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoginSuccess from './screens/LoginSuccess';
import ApartmentListScreen from './screens/ApartmentListScreen/ApartmentListScreen';
import ApartmentScreen from './screens/ApartmentScreen';

import UserScreen from './screens/UserScreen';
import SignUpScreen from './screens/SignUpScreen';
import UpdateUserScreen from './screens/UpdateUserScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

import {navigationTittle} from '../components/styles/userFeature.style';

const Stack = createStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
              headerShown: false,
            }}
        >
            <Stack.Screen name='ApartmentList' component={ApartmentListScreen} />
            <Stack.Screen name='Apartment' component={ApartmentScreen} />
            <Stack.Screen name='Welcome' component={WelcomeScreen}/>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='LoginSuccess' component={LoginSuccess} />
            <Stack.Screen name='User' component={UserScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="UpdateUser" component={UpdateUserScreen}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;
