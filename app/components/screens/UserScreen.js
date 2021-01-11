import React, { useCallback, useEffect} from 'react';
import { Text, View, Image, StyleSheet,TextInput, BackHandler } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { topic, input } from '../styles/userFeature.style';
import { checkLoggedIn, logout} from '../../actions';
import { connect } from 'react-redux';
import { serverApi } from '../../../appsetting';
import { ScreenNames } from '../Navigation/NavigationConst';
import { ROLE_TYPE } from '../../utils';
import AnimatedLoader from 'react-native-animated-loader';
import { useFocusEffect } from '@react-navigation/native';

const UserScreen = ({ logout, navigation, user, checkingLogin}) => {

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    const onBackPress = () => {
        console.log('user screen');
        return true;
    };
    
    const translateRoleUser = () => {
        if(user.data.role === ROLE_TYPE.LAND_LORD)
            return 'Cho thuê trọ';
        else
            return 'Tìm trọ';
    }

    if (checkingLogin) {
        return (
            <View style={{ flex: 1 }}>
                <AnimatedLoader
                    visible={true}
                    overlayColor='rgba(0,0,0,0.5)'
                    source={require('../../assets/2166-dotted-loader.json')}
                    animationStyle={{width: 100, height: 100}}
                    speed={1}
                />
            </View>
        )
    }

    if (user.auth === false) {
        return (
            <View>
                <Text>Đang xử lí...</Text>
            </View>
        );
    }

    return (
        <View>
            <ScrollView style={{width: '100%', height: '100%', backgroundColor: '#214252', paddingHorizontal: 30}}>
                {/* <Text style={topic.style}>Trang cá nhân</Text> */}
                <Image style={styles.avatar} source={{uri:`${serverApi}/${user.data.photo}`}}/>
                <Text style={input.label}>Họ và tên</Text>
                <Text style={input.text}>{user.data.name}</Text>
                <Text style={input.label}>Số điện thoại</Text>
                <Text style={input.text}>{user.data.phoneNumber}</Text>
                <Text style={input.label}>Email</Text>
                <Text style={input.text}>{user.data.email}</Text>
                <Text style={input.label}>Loại tài khoản</Text>
                <Text style={input.text}>{translateRoleUser()}</Text>
                <View style={{marginTop: 10}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ScreenNames.UPDATE_USER)}>
                        <Text style={styles.insideButton}>Chỉnh sửa trang cá nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ScreenNames.CHANGE_PASSWORD)}>
                        <Text style={styles.insideButton}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => logout({navigation})}>
                        <Text style={styles.insideButton}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default connect(
    state => ({
        user: state.user,
        checkingLogin: state.ui.checkingLogin
    }),
    { checkLoggedIn, logout })(UserScreen);

const styles = StyleSheet.create({
    avatar: {
        height: 160,
        width: 160,
        borderRadius: 80,
        alignSelf: 'center',
        marginTop: 16,
        backgroundColor: "white",
        marginBottom: 16
    },
    button: {
        paddingVertical: 10,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#092532',
        marginBottom: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#f5f5f550'
    },
    insideButton: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold'
    }
});