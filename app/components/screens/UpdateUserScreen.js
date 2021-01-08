import React, {useEffect} from 'react';
import { Text, View, Image, StyleSheet, ToastAndroid } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { input, imageButton, navigationTittle} from '../styles/userFeature.style';
import { connect } from 'react-redux';
import { serverApi } from '../../../appsetting';
import { checkLoggedIn, updateUserInformation} from '../../actions';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';

const UpdateUserScreen = ({checkLoggedIn, navigation, user, fetchingData, updateUserInformation}) => {
    const [name, setName] = React.useState(user.data.name);
    const [phoneNumber, setPhoneNumber] = React.useState(user.data.phoneNumber);
    const [photo, setPhoto] = React.useState({});

    //validation
    const [requiredName, setRequiredName] = React.useState(false);
    const [requiredPhoneNumber, setRequiredPhoneNumber] = React.useState(false);
    const [mustPhoneNumber, setMustPhoneNumber] = React.useState(false);
    
    const checkSourceImage = () =>{
        if(Object.keys(photo).length !== 0)
            return photo.uri;
        else
            return `${serverApi}/${user.data.photo}`;
    }

    //Select image from storage
    selectFile = () => {
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

    useEffect(() => {
        checkLoggedIn({ navigation });
        return () => {
            console.log('unmounting...');
        }
    }, []);

    if (fetchingData || !user.auth) {
        return (
            <View>
                <Text>Loading Update User's Information...</Text>
            </View>
        )
    }

    function checkUpdateInformation(requiredName, requiredPhoneNumber, mustPhoneNumber){
        if(requiredName == false && requiredPhoneNumber == false && mustPhoneNumber == false)
            return true;
        return false;
    }

    return (
        <View>
            <View style={{backgroundColor: '#132833', height: 53, flexDirection:'row' ,justifyContent:'space-around', alignItems:'center'}}>
                <Icon.Button name="close" color='#D9D9D9' backgroundColor='#132833' size={30} onPress={()=>navigation.navigate('User')}></Icon.Button>
                <Text style={navigationTittle.style}>Chỉnh sửa trang cá nhân</Text>
                <Icon.Button name='check' color='#06BBD8' backgroundColor='#132833' size={30}
                    onPress={() => {
                        if (checkUpdateInformation(requiredName, requiredPhoneNumber, mustPhoneNumber))
                        {
                            updateUserInformation({ name, phoneNumber, photo, navigation });
                            ToastAndroid.showWithGravity("Thay đổi thông tin thành công", ToastAndroid.SHORT, ToastAndroid.CENTER);
                        }
                        else 
                            ToastAndroid.showWithGravity("Vui lòng điền thông tin đầy đủ và hợp lệ", ToastAndroid.SHORT, ToastAndroid.CENTER);
                    }} ></Icon.Button>
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
        fetchingData: state.ui.fetchingData
    }),
    { checkLoggedIn, updateUserInformation})(UpdateUserScreen);

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