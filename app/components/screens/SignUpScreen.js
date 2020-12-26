import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import { topic, input, mainButton, imageButton } from '../styles/userFeature.style';
import { updateSignupInfo, signup } from '../../actions/index';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

var radio_props = [
    { label: 'Cho thuê trọ', value: 0 },
    { label: 'Tìm trọ', value: 1 }
];

const photosReducer = (state, action) => {
    
    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        case 'remove':
            const newState = [...state];
            newState.splice(action.payload.id, 1);
            return newState;
        default:
            return state;
    }
};

const SignUpScreen = ({ navigation, signup }) => {
    const [name, setName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [role, setRole] = React.useState('landlord');
    const [photo, setPhoto] = React.useState({});


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

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={topic.style}>Đăng ký</Text>
                <View style={styles.mainScreen}>
                    <Text style={input.label}>Tên đăng nhập</Text>
                    <TextInput
                        style={input.text}
                        onChangeText={(e) => setName(e.valueOf())}  
                    />
                    <Text style={input.label}>Số điện thoại</Text>
                    <TextInput
                        style={input.text}
                        onChangeText={(e) => setPhoneNumber(e.valueOf())} />
                    <Text style={input.label}>Email</Text>
                    <TextInput
                        style={input.text}
                        onChangeText={(e) => setEmail(e.valueOf())} />
                    <Text style={input.label}>Mật khẩu</Text>
                    <TextInput
                        style={input.text}
                        onChangeText={(e) => setPassword(e.valueOf())} />
                    <Text style={input.label}>Xác nhận mật khẩu</Text>
                    <TextInput
                        style={input.text}
                        onChangeText={(e) => setPasswordConfirm(e.valueOf())}
                    />
                    <View style={{ alignItems: "center" }}>
                        <Image style={styles.avatar} source={{uri: photo.uri}} ></Image>
                        <TouchableOpacity onPress={() =>  selectFile()}>
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
                            onPress={() => signup({ email, password, passwordConfirm, name, phoneNumber, photo, role, navigation })}>
                            <Text style={mainButton.text}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({ info: state.signupInfo });

export default connect(mapStateToProps, { updateSignupInfo, signup })(SignUpScreen);

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