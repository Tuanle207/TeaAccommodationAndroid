import React ,{useCallback, useEffect, useState} from 'react';
import { Text, View, ToastAndroid, BackHandler, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { input } from '../styles/userFeature.style';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { checkLoggedIn, changePassword} from '../../actions';
import ConfirmPopup from '../defaults/ConfirmPopup';
import { useFocusEffect } from '@react-navigation/native';


const ChangePasswordScreen = ({checkLoggedIn, user, navigation, changePassword}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');
    //To show and unshow password
    const [isCurrentPasswordHidden, setIsCurrentPasswordHidden] = useState(true);
    const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
    //To show and unshow confirmPassword
    const [isNewPasswordConfirmHidden, setIsNewPasswordConfirmHidden] = useState(true);

    //Validation
    const [requiredCurrentPassword, setRequiredCurrentPassword] = useState(false);
    const [requiredNewPassword, setRequiredNewPassword] = useState(false);
    const [requiredNewConfirmPassword, setRequiredNewConfirmPassword] = useState(false);
    const [confirmPasswordMustLikePassword, setConfirmPasswordMustLikePassword] = useState(false);

    const [popupExitVisibility, setPopupExitVisibility] = useState(false);

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );
    
    const onBackPress = () => {
        setPopupExitVisibility(true);
        return true;
    };

    function checkChangePassword(requiredCurrentPassword, requiredNewPassword, requiredNewConfirmPassword,
        confirmPasswordMustLikePassword) {
        if (requiredCurrentPassword == false && requiredNewPassword == false &&
            requiredNewConfirmPassword == false && confirmPasswordMustLikePassword == false)
            return true;
        return false;
    };
    function checkDefault(currentPassword, password, passwordConfirm) {
        if (currentPassword.length != 0 && password.length != 0 && passwordConfirm.length != 0)
            return true;
        return false;
    };

    function checkAndShowValidationDefault(currentPassword, password, passwordConfirm,
        setRequiredCurrentPassword, setRequiredNewPassword, setRequiredNewConfirmPassword) {
        if (currentPassword.length == 0) {
            setRequiredCurrentPassword(true);
        }
        if (password.length == 0) {
            setRequiredNewPassword(true);
        }
        if (passwordConfirm.length == 0) {
            setRequiredNewConfirmPassword(true);
        }
    };

    return (
        <View>
            <ConfirmPopup
                text={'Có vẻ như bạn đang nhập thông tin. Bạn có chắc muốn trở lại không?'}
                visible={popupExitVisibility}
                setVisible={setPopupExitVisibility}
                onFinish={ navigation.pop } 
            />
            <View style={{ backgroundColor: '#132833', height: 53, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setPopupExitVisibility(true)}>
                    <AntDesignIcon name="close" color='#D9D9D9' size={30}></AntDesignIcon>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#fff",
                    justifyContent: 'center',
                    paddingHorizontal: 50
                }}>Đổi mật khẩu</Text>
                <TouchableOpacity onPress={() => {
                        if (checkChangePassword(requiredCurrentPassword, requiredNewPassword, requiredNewConfirmPassword,
                            confirmPasswordMustLikePassword) == true && checkDefault(currentPassword, password, passwordConfirm) == true)
                            changePassword({ user, currentPassword, password, passwordConfirm, navigation })
                        else {
                            ToastAndroid.showWithGravity("Vui lòng điền thông tin đầy đủ và hợp lệ", ToastAndroid.SHORT, ToastAndroid.CENTER);
                            checkAndShowValidationDefault(currentPassword, password, passwordConfirm,
                                setRequiredCurrentPassword, setRequiredNewPassword, setRequiredNewConfirmPassword)
                        }
                    }}  style={{ padding: 10 }} >
                    <AntDesignIcon name='check' color='#06BBD8' size={28}/>
                </TouchableOpacity>
                
            </View>
            <ScrollView style={{ width: '100%', height: '100%', backgroundColor: '#204051', paddingHorizontal: 30, paddingTop: 30 }}>
                <Text style={input.label}>Mật khẩu cũ</Text>
                <View style={input.ContainerPassword}>
                    <TextInput style={input.textPassword}
                        secureTextEntry={isCurrentPasswordHidden ? true : false}
                        onChangeText={(e) => {
                            setCurrentPassword(e.valueOf());
                            if (e.valueOf().length == 0)
                                setRequiredCurrentPassword(true);
                            else
                                setRequiredCurrentPassword(false);
                        }}></TextInput>
                    <TouchableOpacity style={{ padding: 10, marginLeft: 'auto' }} onPress={() => {
                            if (isCurrentPasswordHidden == true)
                                setIsCurrentPasswordHidden(false);
                            else
                                setIsCurrentPasswordHidden(true);
                        }}>
                        <AntDesignIcon name="eye" size={16} color={'#fff'} />
                    </TouchableOpacity>
                    
                </View>
                <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>{requiredCurrentPassword ?
                    <Text>Mật khẩu cũ không được bỏ trống</Text> : ''}</Text>

                <Text style={input.label}>Mật khẩu mới</Text>
                <View style={input.ContainerPassword}>
                    <TextInput style={input.textPassword}
                        secureTextEntry={isNewPasswordHidden ? true : false}
                        onChangeText={(e) => {
                            setPassword(e.valueOf());
                            if (e.valueOf().length == 0)
                                setRequiredNewPassword(true);
                            else
                                setRequiredNewPassword(false);
                        }}></TextInput>
                    <TouchableOpacity style={{ padding: 10, marginLeft: 'auto' }} onPress={() => {
                            if (isNewPasswordHidden == true)
                                setIsNewPasswordHidden(false);
                            else
                                setIsNewPasswordHidden(true);
                        }} >
                        <AntDesignIcon name="eye" size={16} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>{requiredNewPassword ?
                    <Text>Mật khẩu mới không được bỏ trống</Text> : ''}</Text>
                <Text style={input.label}>Xác nhận mật khẩu mới</Text>
                <View style={input.ContainerPassword}>
                    <TextInput
                        style={input.textPassword}
                        secureTextEntry={isNewPasswordConfirmHidden ? true : false}
                        onChangeText={(e) => {
                            setpasswordConfirm(e.valueOf())
                            if (e.valueOf().length == 0)
                                setRequiredNewConfirmPassword(true);
                            else
                                setRequiredNewConfirmPassword(false);
                            if (e.valueOf() == password.valueOf())
                                setConfirmPasswordMustLikePassword(false);
                            else
                                setConfirmPasswordMustLikePassword(true);
                        }} />
                    <TouchableOpacity style={{ padding: 10, marginLeft: 'auto' }} onPress={() => {
                            if (isNewPasswordConfirmHidden == true)
                                setIsNewPasswordConfirmHidden(false);
                            else
                                setIsNewPasswordConfirmHidden(true);
                        }} >
                        <AntDesignIcon name="eye" size={16} color={'#fff'} />
                    </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>
                        {(requiredNewConfirmPassword) ? <Text>Xác nhận mật khẩu mới không được bỏ trống</Text> : 
                        confirmPasswordMustLikePassword ? <Text>Chưa trùng khớp với mật khẩu mới</Text> : ''}
                    </Text>
            </ScrollView>
        </View>
    );
}
export default connect(state => ({
    user: state.user,
    fetchingData: state.ui.fetchingData
}), {checkLoggedIn, changePassword})(ChangePasswordScreen);