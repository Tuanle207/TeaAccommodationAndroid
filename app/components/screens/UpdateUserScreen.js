import React, {useCallback, useEffect, useState} from 'react';
import { Text, View, Image, StyleSheet, ToastAndroid, BackHandler, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { input, imageButton, navigationTittle} from '../styles/userFeature.style';
import { connect } from 'react-redux';
import { serverApi } from '../../../appsetting';
import { updateUserInformation} from '../../actions';
import ImagePicker from 'react-native-image-picker';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import ConfirmPopup from '../defaults/ConfirmPopup';
import { useFocusEffect } from '@react-navigation/native';

const UpdateUserScreen = ({ navigation, user, ui, updateUserInformation}) => {
    const [name, setName] = useState(user.data.name);
    const [phoneNumber, setPhoneNumber] = useState(user.data.phoneNumber);
    const [photo, setPhoto] = useState({});

    //validation
    const [requiredName, setRequiredName] = useState(false);
    const [requiredPhoneNumber, setRequiredPhoneNumber] = useState(false);
    const [mustPhoneNumber, setMustPhoneNumber] = useState(false);
    
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
        console.log('create apartmetn screen');
        setPopupExitVisibility(true);
        return true;
    };

    const checkSourceImage = () =>{
        if(Object.keys(photo).length !== 0)
            return photo.uri;
        else
            return `${serverApi}/${user.data.photo}`;
    }

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

    
    function checkUpdateInformation(requiredName, requiredPhoneNumber, mustPhoneNumber){
        if(requiredName == false && requiredPhoneNumber == false && mustPhoneNumber == false)
            return true;
        return false;
    }

    if (ui.checkLogin === true || !user.auth) {
        return (
            <View>
                <Text>Đang tải...</Text>
            </View>
        )
    }

    return (
        <View>
            <ConfirmPopup
                text={'Có vẻ bạn đang chỉnh sửa thông tin. Bạn có chắc muốn trở lại không?'}
                visible={popupExitVisibility}
                setVisible={setPopupExitVisibility}
                onFinish={ navigation.pop } 
            />
            <View style={{backgroundColor: '#132833', height: 53, flexDirection:'row' ,justifyContent:'space-around', alignItems:'center'}}>
                <TouchableOpacity  TouchableOpacity onPress={() => setPopupExitVisibility(true)} style={{ padding: 10 }}>
                    <AntDesignIcon name="close" color='#D9D9D9' size={28}></AntDesignIcon>
                </TouchableOpacity>
                <Text style={navigationTittle.style}>Chỉnh sửa trang cá nhân</Text>
                <TouchableOpacity onPress={() => {
                        if (checkUpdateInformation(requiredName, requiredPhoneNumber, mustPhoneNumber))
                        {
                            updateUserInformation({ name, phoneNumber, photo, navigation });
                            ToastAndroid.showWithGravity("Thay đổi thông tin thành công", ToastAndroid.SHORT, ToastAndroid.CENTER);
                        }
                        else 
                            ToastAndroid.showWithGravity("Vui lòng điền thông tin đầy đủ và hợp lệ", ToastAndroid.SHORT, ToastAndroid.CENTER);
                    }}  style={{ padding: 10 }}>
                    <AntDesignIcon name='check' color='#06BBD8' size={28}/>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: '100%', height: '100%', backgroundColor: '#204051', paddingHorizontal: 30 }}>
                <View style={{ alignItems: "center", marginBottom: 28 }}>
                    <Image style={styles.avatar} source={{uri: checkSourceImage()}}></Image>
                    <TouchableOpacity onPress={()=> selectFile()}>
                        <Text style={imageButton.style}>Chọn ảnh đại diện</Text>
                    </TouchableOpacity>
                </View>
                <Text style={input.label}>Họ và tên</Text>
                <TextInput style={input.textWithValidate} onChangeText={(e) => {
                    setName(e.valueOf())
                    if (e.valueOf().length == 0)
                        setRequiredName(true);
                    else
                        setRequiredName(false);
                }}>{name}</TextInput>
                <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>{requiredName ? <Text>Họ tên không được bỏ trống</Text> : ''}</Text>
                <Text style={input.label}>Số điện thoại</Text>
                <TextInput style={input.textWithValidate} keyboardType="number-pad"
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
                    }}>{phoneNumber}</TextInput>
                <Text style={{ color: 'red', marginBottom: 10, fontSize: 13 }}>
                    {(requiredPhoneNumber) ? <Text>Số điện thoại không được bỏ trống</Text> : mustPhoneNumber ? <Text>Số điện thoại chỉ được chứa số</Text> : ''}
                </Text>
            </ScrollView>
        </View>
    );
}

export default connect(
    state => ({
        user: state.user,
        ui: state.ui
    }),
    { updateUserInformation})(UpdateUserScreen);

const styles = StyleSheet.create({
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 80,
        alignSelf: 'center',
        marginTop: 16,
        backgroundColor: "white",
    }
});