import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import LoginScreen from '../screens/LoginScreen';
import LoginSuccess from '../screens/LoginSuccess';
import ApartmentListScreen from '../screens/ApartmentListScreen';
import ApartmentScreen from '../screens/ApartmentScreen';
import CreateOrUpdateApartmentScreen from '../screens/CreateOrUpdateApartmentScreen';
import MyApartmentScreen from '../screens/MyApartmentScreen';
import { checkLoggedIn, getParams } from '../../actions';
import { connect } from 'react-redux';
import { ScreenNames, TabNames } from './NavigationConst';
import SignUpScreen from '../screens/SignUpScreen';
import UpdateUserScreen from '../screens/UpdateUserScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import UserScreen from '../screens/UserScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const renderHeader = name => (
    <View style={{ padding: 5, backgroundColor: '#456268'}}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>{name}</Text>
    </View>
)

const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={ScreenNames.APARTMENT_LIST}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={ScreenNames.APARTMENT_LIST} 
                component={ApartmentListScreen}
                options={{ headerShown: true,  header: () => renderHeader(ScreenNames.APARTMENT_LIST)}} 
                />
            <Stack.Screen name={ScreenNames.APARTMENT_DETAIL} 
                component={ApartmentScreen}
                options={{ headerShown: false,  header: () => renderHeader(ScreenNames.APARTMENT_DETAIL)}}  />
        </Stack.Navigator>
    );
};

const MyApartmentNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={ScreenNames.MY_APARTMENT}
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen name={ScreenNames.MY_APARTMENT} 
                component={MyApartmentScreen} 
                options={{ headerShown: true,  header: () => renderHeader(ScreenNames.MY_APARTMENT)}} />
            <Stack.Screen name={ScreenNames.APARTMENT_DETAIL} component={ApartmentScreen} />
            <Stack.Screen name={ScreenNames.CREATE_APARTMENT} 
            component={CreateOrUpdateApartmentScreen} 
                 options={{ headerShown: true,  header: () => renderHeader(ScreenNames.CREATE_APARTMENT)}} />
            <Stack.Screen name={ScreenNames.UPDATE_APARTMENT} 
                component={CreateOrUpdateApartmentScreen}
                options={{ headerShown: true,  header: () => renderHeader(ScreenNames.UPDATE_APARTMENT)}}  />
        </Stack.Navigator>
    );
};

const UserProfileNavigator = () => {
    return (
        <Stack.Navigator
        initialRouteName={ScreenNames.USER}
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
            <Stack.Screen name={ScreenNames.LOGIN_SUCCESS} component={LoginSuccess} />
            <Stack.Screen name={ScreenNames.SIGNUP} component={SignUpScreen} />
            <Stack.Screen name={ScreenNames.CHANGE_PASSWORD} component={ChangePasswordScreen} />
            <Stack.Screen name={ScreenNames.UPDATE_USER} component={UpdateUserScreen} />
            <Stack.Screen name={ScreenNames.USER} component={UserScreen} />
        </Stack.Navigator>
    );
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
                if (route.name === TabNames.SEARCHING_APARTMENTS) {
                    return <EntypoIcon name={'home'} size={size} color={color} />;
                } else if (route.name === TabNames.MY_APARTMENT) {
                    return <EntypoIcon name={'list'} size={size} color={color} />;
                } else if (route.name == TabNames.ACCOUNT) {
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
            <Tab.Screen name={TabNames.SEARCHING_APARTMENTS} component={MainStackNavigator} />
            <Tab.Screen name={TabNames.MY_APARTMENT} component={MyApartmentNavigator} />
            <Tab.Screen name={TabNames.ACCOUNT} component={UserProfileNavigator} />
        </Tab.Navigator>
    );
}

const Navigation = ({ getParams }) => {

    useEffect(() => {
        getParams();
    }, []);

  return (
    <NavigationContainer>
        <StatusBar backgroundColor='#456268'  />
        <BottomTabNavigator/>
    </NavigationContainer>
  );
};


export default connect(null, { getParams })(Navigation);
