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
            initialRouteName='SignUp'
            screenOptions={{
            }}
        >
            <Stack.Screen name='ApartmentList' component={ApartmentListScreen} />
            <Stack.Screen name='Apartment' component={ApartmentScreen} />
            <Stack.Screen name='Welcome' component={WelcomeScreen}/>
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name='LoginSuccess' component={LoginSuccess} options={{headerShown: false}} />
            <Stack.Screen name='User' component={UserScreen} options={{headerShown: false}} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
            <Stack.Screen name="UpdateUser" component={UpdateUserScreen} 
                          options={({navigation}) => ({
                            title: 'Chỉnh sửa trang cá nhân',
                            headerTitleStyle: navigationTittle.style, 
                            headerStyle: {backgroundColor: '#132833', height: 53},
                            headerLeft: ()=>(
                                <Icon.Button name="close" color='#D9D9D9' backgroundColor='#132833' size={30}></Icon.Button>
                            ),
                            headerRight: () => (
                              <Icon.Button name='check' color='#06BBD8' backgroundColor='#132833' size={30}></Icon.Button>
                            )
                          })}
                            
                          />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}
                            options={{
                            title: 'Đổi mật khẩu',
                            headerTitleStyle: navigationTittle.style, 
                            headerStyle: {backgroundColor: '#132833', height: 53},
                            headerLeft: ()=>(
                              <Icon.Button name="close" color='#D9D9D9' backgroundColor='#132833' size={30}
                              onPress={() => navigation.navigate("User")}></Icon.Button>
                            ),
                            headerRight: () => (
                              <Icon.Button name='check' color='#06BBD8' backgroundColor='#132833' size={30}></Icon.Button>
                            )
                          }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;
