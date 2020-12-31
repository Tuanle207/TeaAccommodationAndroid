import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import { topic, input, mainButton, imageButton } from '../styles/userFeature.style';
import { signup } from '../../actions/index';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';

var radio_props = [
    { label: 'Cho thuê trọ', value: 0 },
    { label: 'Tìm trọ', value: 1 }
];

const SignUpScreen = ({ navigation, signup }) => {
    const [name, setName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [role, setRole] = React.useState('landlord');
    const [photo, setPhoto] = React.useState({});

    //To show and unshow password
    const [isPassWordHidden, setIsPasswordHidden] = React.useState(true);
    //To show and unshow password
    const [isPassWordConfirmHidden, setIsPasswordConfirmHidden] = React.useState(true);

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
                    <Text style={input.label}>Họ và tên</Text>
                    <TextInput
                        style={input.text}
                        onChangeText={(e) => setName(e.valueOf())}
                    />
                    <Text style={input.label}>Số điện thoại</Text>
                    <TextInput
                        keyboardType="number-pad"
                        style={input.text}
                        onChangeText={(e) => setPhoneNumber(e.valueOf())} />
                    <Text style={input.label}>Email</Text>
                    <TextInput
                        keyboardType="email-address"
                        style={input.text}
                        onChangeText={(e) => setEmail(e.valueOf())} />
                    <Text style={input.label}>Mật khẩu</Text>
                    <View style={input.ContainerPassword}>
                        <TextInput
                            style={input.textPassword}
                            secureTextEntry={isPassWordHidden ? true : false}
                            onChangeText={(e) => setPassword(e.valueOf())} />
                        <Icon.Button name="eye" backgroundColor="transparent"
                            paddingLeft={0} paddingRight={0} marginTop={7}
                            onPress={() => {
                                if (isPassWordHidden == true)
                                    setIsPasswordHidden(false);
                                else
                                    setIsPasswordHidden(true);
                            }}
                        />
                    </View>
                    <Text style={input.label}>Xác nhận mật khẩu</Text>
                    <View style={input.ContainerPassword}>
                        <TextInput
                            style={input.textPassword}
                            secureTextEntry={isPassWordConfirmHidden ? true : false}
                            onChangeText={(e) => setPasswordConfirm(e.valueOf())}
                        />
                        <Icon.Button name="eye" backgroundColor="transparent"
                            paddingLeft={0} paddingRight={0} marginTop={7}
                            onPress={() => {
                                if (isPassWordConfirmHidden == true)
                                    setIsPasswordConfirmHidden(false);
                                else
                                    setIsPasswordConfirmHidden(true);
                            }}
                        />
                    </View>
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

export default connect(mapStateToProps, {signup})(SignUpScreen);

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