import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import {
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoginSuccess from './screens/LoginSuccess';
import ApartmentListScreen from './screens/ApartmentListScreen/ApartmentListScreen';
import ApartmentScreen from './screens/ApartmentScreen';
import CreateOrUpdateApartmentScreen from './screens/CreateOrUpdateApartmentScreen';
import MyApartmentScreen from './screens/MyApartmentScreen/MyApartmentScreen';
import { getParams } from '../actions';
import { connect } from 'react-redux';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='ApartmentList'
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen name='Tìm kiếm phòng trọ' component={ApartmentListScreen} />
            <Stack.Screen name='Chi Tiết phòng trọ' component={ApartmentScreen} />
        </Stack.Navigator>
    );
};

const MyApartmentNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Phòng trọ đã đăng'
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen name='Phòng trọ đã đăng' component={MyApartmentScreen} />
            <Stack.Screen name='Chi Tiết phòng trọ' component={ApartmentScreen} />
            <Stack.Screen name='Thêm phòng trọ mới' component={CreateOrUpdateApartmentScreen} />
            <Stack.Screen name='Cập nhật thông tin phòng trọ' component={CreateOrUpdateApartmentScreen} />
        </Stack.Navigator>
    );
};

const UserProfileNavigator = () => {
    return (
        <Stack.Navigator
        initialRouteName='Đăng nhập'
        screenOptions={{
            headerShown: true
        }}
        >
            <Stack.Screen name='Đăng nhập' component={LoginScreen} />
            <Stack.Screen name='Đăng nhập thành công' component={LoginSuccess} />
        </Stack.Navigator>
    );
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
                if (route.name === 'Tìm kiếm phòng trọ') {
                    // iconName = focused
                    //   ? 'home'
                    //   : 'home';
                    return <EntypoIcon name={'home'} size={size} color={color} />;
                } else if (route.name === 'Phòng trọ của tôi') {
                    return <EntypoIcon name={'list'} size={size} color={color} />;
                }
                else if (route.name == 'Tài khoản') {
                    return <AntDesignIcon name={'user'} size={size} color={color} />;
                }

  
              // You can return any component that you like here!
              return <EntypoIcon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
            >
            <Tab.Screen name="Tìm kiếm phòng trọ" component={MainStackNavigator} />
            <Tab.Screen name="Phòng trọ của tôi" component={MyApartmentNavigator} />
            <Tab.Screen name="Tài khoản" component={UserProfileNavigator} />
        </Tab.Navigator>
    );
}

const Navigation = ({ getParams }) => {

    useEffect(() => {
        getParams();
    }, []);

  return (
    <NavigationContainer>
        <BottomTabNavigator/>
    </NavigationContainer>
  );
};


export default connect(null, { getParams })(Navigation);
