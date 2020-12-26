import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { updateLoginInfo, login } from '../../actions';
import { input, mainButton } from '../styles/userFeature.style';

const LoginScreen = ({ navigation, updateLoginInfo, login, info }) => {

    useEffect(() => {

    }, [info]);

    return (
        <View style={styles.container}>
            <View style={styles.mainScreen}>
                <View style={styles.login}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: '#F9F9F9', marginBottom: 10 }}>Đăng nhập</Text>
                    <Text style={input.label}>Tên đăng nhập</Text>
                    <TextInput
                        style={input.text}
                        onChangeText={(e) => updateLoginInfo({ email: e.valueOf() })}
                        value={info.email}
                    />
                    <Text style={input.label}>Mật khẩu</Text>
                    <TextInput
                        style={input.text}
                        secureTextEntry={true}
                        onChangeText={(e) => updateLoginInfo({ password: e.valueOf() })}
                        value={info.password}
                    />
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity style={mainButton.style}
                            onPress={() => login({ ...info, navigation })}>
                            <Text style={mainButton.text}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={{ color: "#D4CBCB" }}>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}> Hãy đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => ({ info: state.loginInfo });

export default connect(mapStateToProps, { updateLoginInfo, login })(LoginScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#204051',
        flexDirection: "column",
        height: "100%",
        width: "100%",
        flex: 1
    },
    mainScreen: {
        flex: 12.5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        height: 50,
        flexDirection: "row",
        borderTopColor: "#D4CBCB",
        borderTopWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        flex: 1,
        width: 289,
        height: 124,
        resizeMode: "contain",
        marginTop: 40
    },
    login: {
        alignItems: "stretch",
        marginTop: 25,
        width: "100%",
        paddingLeft: 37,
        paddingRight: 37
    },
    text: {
        color: '#D9D9D9'
    },
    input: {
        width: "100%",
        borderBottomColor: "#fff",
        borderWidth: 1,
        borderColor: "#204051",
        color: "#fff",
        paddingLeft: 0,
        paddingLeft: 0,
        fontSize: 18,
        marginBottom: 19,
        paddingBottom: 5,
        paddingTop: 5
    },
    button: {
        alignItems: "center",
        backgroundColor: "#06BBD8",
        borderRadius: 23,
        paddingHorizontal: 35,
        paddingVertical: 10,
        width: "58%",
    }
});