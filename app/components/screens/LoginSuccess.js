import React, { useEffect } from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {checkLoggedIn, logout} from '../../actions';
import axios from 'axios';


const LoginSuccess = ({checkLoggedIn, logout, navigation, user, fetchingData}) => {

    useEffect(() => {
        checkLoggedIn({navigation});

        return () => {
            console.log('unmounting...');
        }
    }, []);

    if (fetchingData || !user.auth) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    return (
        <View>
            <Text>You have logged in successfully!</Text>
            <Text>You have used email: for authentication</Text>
            <Button onPress={() => logout({navigation})} title='Đăng xuất' />
        </View>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user, 
        fetchingData: state.ui.fetchingData
    }
}
export default connect(mapStateToProps,{checkLoggedIn, logout})(LoginSuccess);