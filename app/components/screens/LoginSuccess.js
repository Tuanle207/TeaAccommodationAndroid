import React, { useEffect } from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {checkLoggedIn, logout} from '../../actions';


const LoginSuccess = ({checkLoggedIn, logout, navigation, user, fetchingData}) => {

    // useEffect(() => {
    //     checkLoggedIn({navigation});

    //     return () => {
    //         console.log('unmounting...');
    //     }
    // }, []);

    if (fetchingData || !user.auth) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    return (
        <View style={{backgroundColor: '#fff'}}>
            <Text>You have logged in successfully!</Text>
            <Text>You have used email: for authentication</Text>
            <View style={{
                alignSelf: 'center',
                height: 50,
                width: 50,
                marginVertical: 20,
                backgroundColor:'#fff',
                elevation: 10
            }}>

            </View>
            <Button onPress={() => logout({navigation})} title='Đăng xuất' />
        </View>
    )
};

export default connect(
    state => ({
        user: state.user, 
        fetchingData: state.ui.fetchingData
    }), 
    {checkLoggedIn, logout})(LoginSuccess);