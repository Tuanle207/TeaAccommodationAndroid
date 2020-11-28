import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import { topic, input, mainButton, imageButton } from '../styles/userFeature.style';

var radio_props = [
    { label: 'Cho thuê trọ', value: 0 },
    { label: 'Tìm trọ', value: 1 }
];

export default class SignUpScreen extends Component{
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={topic.style}>Đăng ký</Text>
                    <View style={styles.mainScreen}>
                        <Text style={input.label}>Tên đăng nhập</Text>
                        <TextInput style={input.text} />
                        <Text style={input.label}>Số điện thoại</Text>
                        <TextInput style={input.text} />
                        <Text style={input.label}>Địa chỉ</Text>
                        <TextInput style={input.text} />
                        <Text style={input.label}>Email</Text>
                        <TextInput style={input.text} />
                        <Text style={input.label}>Mật khẩu</Text>
                        <TextInput style={input.text} />
                        <Text style={input.label}>Xác nhận mật khẩu</Text>
                        <TextInput style={input.text} />
                        <View style={{ alignItems: "center" }}>
                            <Image style={styles.avatar}></Image>
                            <TouchableOpacity>
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
                                onPress={(value) => { this.setState({ value: value }) }}
                                labelStyle={{ marginRight: 40 }}
                            >
                            </RadioForm>
                        </View>
                        <View style={{marginBottom: 37}}>
                            <TouchableOpacity style={mainButton.style} 
                                                onPress={() => this.props.navigation.navigate("Login")}>
                                <Text style={mainButton.text}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    };
}

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
        backgroundColor: "#fff",
        borderRadius: 80,
    },
    radio_button: {
        marginTop: 28,
        marginBottom: 35,
        alignSelf: "center",
        marginLeft: 30,
    }
});