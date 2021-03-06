import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ToastAndroid, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import { topic, input, mainButton, imageButton } from '../styles/userFeature.style';
import { signup } from '../../actions/index';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import ConfirmPopup from '../defaults/ConfirmPopup';

var radio_props = [
    { label: 'Cho thuê trọ', value: 0 },
    { label: 'Tìm trọ', value: 1 }
];

const SignUpScreen = ({ navigation, signup }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [role, setRole] = useState('landlord');
    const [photo, setPhoto] = useState({});
    //To show and unshow password
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    //To show and unshow confirmPassword
    const [isPasswordConfirmHidden, setIsPasswordConfirmHidden] = useState(true);

    //Validation
    const [requiredName, setRequiredName] = useState(false);
    const [requiredPhoneNumber, setRequiredPhoneNumber] = useState(false);
    const [mustPhoneNumber, setMustPhoneNumber] = useState(false);
    const [requiredEmail, setRequiredEmail] = useState(false);
    const [formEmail, setFormEmail] = useState(false);
    const [requiredPassword, setRequiredPassword] = useState(false);
    const [requiredConfirmPassword, setRequiredConfirmPassword] = useState(false);
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

    //Select image from storage
    const selectFile = () => {
        var options = {
            title: 'Chọn ảnh',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, res => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else {
                let source = res;
                setPhoto(source);
            }
        });
    };

    function checkToDoneSignup(requiredName, requiredPhoneNumber, mustPhoneNumber, requiredEmail, formEmail,
        requiredPassword, requiredConfirmPassword, confirmPasswordMustLikePassword){
        if (requiredName == false && requiredPhoneNumber == false && mustPhoneNumber == false && requiredEmail == false
            && formEmail == false && requiredPassword == false && requiredConfirmPassword == false &&
            confirmPasswordMustLikePassword == false)
            return true;
        return false;
    };
    function checkDefault (name, phoneNumber, email, password, passwordConfirm){
        if(name.length != 0 && phoneNumber.length != 0 && email.length != 0 && password.length != 0 && passwordConfirm.length != 0)
            return true;
        return false;
    };

    function checkAndShowValidationDefault(name, phoneNumber, email, password, passwordConfirm,
        setRequiredName, setRequiredPhoneNumber, setRequiredEmail, setRequiredPassword, setRequiredConfirmPassword) {
            if(name.length == 0){
                setRequiredName(true);
            }
            if(phoneNumber.length == 0){
                setRequiredPhoneNumber(true);
            }
            if(email.length == 0){
                setRequiredEmail(true);
            }
            if(password.length == 0){
                setRequiredPassword(true);
            }
            if(passwordConfirm.length == 0)
                setRequiredConfirmPassword(true);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}  style = {{flex:1}}>
            <ScrollView>
                <ConfirmPopup
                    text={'Có vẻ như bạn đang nhập thông tin. Bạn có chắc muốn trở lại không?'}
                    visible={popupExitVisibility}
                    setVisible={setPopupExitVisibility}
                    onFinish={ navigation.pop } 
                />
                <View style={styles.container}>
                    {/* <Text style={topic.style}>Đăng ký</Text> */}
                    <View style={styles.mainScreen}>
                        <Text style={input.label}>Họ và tên</Text>
                        <TextInput
                            style={input.textWithValidate}
                            onChangeText={(e) => {
                                setName(e.valueOf())
                                if (e.valueOf().length == 0)
                                    setRequiredName(true);
                                else
                                    setRequiredName(false);
                            }}
                        />
                        <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>{requiredName ? <Text>Họ tên không được bỏ trống</Text> : ''}</Text>
                        <Text style={input.label}>Số điện thoại</Text>
                        <TextInput
                            style={input.textWithValidate}
                            keyboardType="number-pad"
                            onChangeText={(e) => {
                                setPhoneNumber(e.valueOf())
                                if (e.valueOf().length == 0)
                                    setRequiredPhoneNumber(true);
                                else
                                    setRequiredPhoneNumber(false);
                                if (/^-?[\d.]+(?:e-?\d+)?$/.test(e.valueOf()) == true)
                                    setMustPhoneNumber(false);
                                else
                                    setMustPhoneNumber(true);
                            }}
                        />
                        <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>
                            {(requiredPhoneNumber) ? <Text>Số điện thoại không được bỏ trống</Text> : mustPhoneNumber ? <Text>Số điện thoại chỉ được chứa số</Text> : ''}
                        </Text>
                        <Text style={input.label}>Email</Text>
                        <TextInput

                            style={input.textWithValidate}
                            keyboardType="email-address"
                            onChangeText={(e) => {
                                setEmail(e.valueOf())
                                if (e.valueOf().length == 0)
                                    setRequiredEmail(true);
                                else
                                    setRequiredEmail(false);
                                if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.valueOf()) == true)
                                    setFormEmail(false);
                                else
                                    setFormEmail(true);
                            }}
                        />
                        <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>
                            {(requiredEmail) ? <Text>Email không được bỏ trống</Text> : formEmail ? 
                            <Text>Email chưa đúng định dạng. Ví dụ: example@gmail.com</Text> : ''}
                        </Text>
                        <Text style={input.label}>Mật khẩu</Text>
                        <View style={input.ContainerPassword}>
                            <TextInput
                                style={input.textPassword}
                                secureTextEntry={isPasswordHidden ? true : false}
                                onChangeText={(e) => {
                                    setPassword(e.valueOf());
                                    if (e.valueOf().length == 0)
                                        setRequiredPassword(true);
                                    else
                                        setRequiredPassword(false);
                                }} />

                            <TouchableOpacity style={{ padding: 10, marginLeft: 'auto' }} 
                                onPress={() => {
                                    if (isPasswordHidden == true)
                                        setIsPasswordHidden(false);
                                    else
                                        setIsPasswordHidden(true);
                                }} >
                                <AntDesignIcon name="eye" size={16} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>{requiredPassword ?
                            <Text>Mật khẩu không được bỏ trống</Text> : ''}</Text>
                        <Text style={input.label}>Xác nhận mật khẩu</Text>
                        <View style={input.ContainerPassword}>
                            <TextInput
                                style={input.textPassword}
                                secureTextEntry={isPasswordConfirmHidden ? true : false}
                                onChangeText={(e) => {
                                    setPasswordConfirm(e.valueOf())
                                    if (e.valueOf().length == 0)
                                        setRequiredConfirmPassword(true);
                                    else
                                        setRequiredConfirmPassword(false);
                                    if (e.valueOf() == password.valueOf())
                                        setConfirmPasswordMustLikePassword(false);
                                    else
                                        setConfirmPasswordMustLikePassword(true);
                                }} />
                            <TouchableOpacity style={{ padding: 10, marginLeft: 'auto' }} onPress={() => {
                                if (isPasswordConfirmHidden == true)
                                    setIsPasswordConfirmHidden(false);
                                else
                                    setIsPasswordConfirmHidden(true);
                            }} >
                                <AntDesignIcon name="eye" size={16} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>
                            {(requiredConfirmPassword) ? <Text>Xác nhận mật khẩu không được bỏ trống</Text> : 
                            confirmPasswordMustLikePassword ? <Text>Chưa trùng khớp với mật khẩu</Text> : ''}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <Image style={styles.avatar} source={{ uri: photo.uri }} ></Image>
                            <TouchableOpacity onPress={() => selectFile()}>
                                <Text style={imageButton.style}>Chọn ảnh đại diện</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.radio_button}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                formHorizontal={true}
                                buttonColor={'white'}
                                labelColor={'white'}
                                selectedButtonColor={'white'}
                                selectedLabelColor={'white'}
                                buttonInnerColor={'#000'}
                                buttonSize={8}
                                buttonOuterSize={20}
                                onPress={(value) => {
                                    if (value == 0)
                                        setRole('landlord');
                                    else
                                        setRole('user');
                                    console.log(value);
                                }}
                                labelStyle={{ marginRight: 40 }}
                            >
                            </RadioForm>
                        </View>
                        <View style={{ marginBottom: 37 }}>
                            <TouchableOpacity style={mainButton.style}
                                onPress={() => {
                                    if (checkDefault(name, phoneNumber, email, password, passwordConfirm) == true
                                        && checkToDoneSignup(requiredName, requiredPhoneNumber, mustPhoneNumber, requiredEmail,
                                            formEmail, requiredPassword, requiredConfirmPassword, confirmPasswordMustLikePassword) == true) {
                                        signup({ email, password, passwordConfirm, name, phoneNumber, photo, role, navigation });
                                    }
                                    else {
                                        ToastAndroid.showWithGravity("Vui lòng điền thông tin đăng ký hợp lệ", ToastAndroid.SHORT, ToastAndroid.CENTER);
                                        checkAndShowValidationDefault(name, phoneNumber, email, password, passwordConfirm,
                                            setRequiredName, setRequiredPhoneNumber, setRequiredEmail,
                                            setRequiredPassword, setRequiredConfirmPassword);
                                    }
                                }}>
                                <Text style={mainButton.text}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { signup })(SignUpScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#204051',
        flexDirection: "column",
        height: "135%",
        width: "100%",
        alignItems: "center"
    },
    mainScreen: {
        marginTop: 25,
        width: "100%",
        paddingLeft: 37,
        paddingRight: 37
    },
    avatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        resizeMode: "cover",
        backgroundColor: "#fff"
    },
    radio_button: {
        marginTop: 28,
        marginBottom: 35,
        alignSelf: "center",
        marginLeft: 30,
    }
});