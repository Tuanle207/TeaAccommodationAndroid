import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, RadioNodeList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
    {label: 'Cho thuê trọ', value: 0 },
    {label: 'Tìm trọ', value: 1 }
  ];

export default class SignUpScreen extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.tittle}>Đăng ký</Text>
                    <View style={styles.mainScreen}>
                        <Text style={styles.text}>Tên đăng nhập</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.text}>Số điện thoại</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.text}>Địa chỉ</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.text}>Email</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.text}>Mật khẩu</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.text}>Xác nhận mật khẩu</Text>
                        <TextInput style={styles.input} />
                        <View style={{ alignItems: "center" }}>
                            <Image style={styles.avatar}></Image>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: "#06BBD8", marginTop: 17 }}>Chọn ảnh đại diện</Text>
                            </TouchableOpacity>
                        </View>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={true}
                            onPress={(value) => {this.setState({value:value})}}
                            />
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={{ fontWeight: "bold" }}>Đăng ký</Text>
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
    tittle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 15,

    },
    mainScreen: {
        marginTop: 25,
        flex: 2,
        width: "100%",
        paddingLeft: 37,
        paddingRight: 37
    },

    text: {
        color: '#D9D9D9',
        fontSize: 13,
    },
    input: {
        width: "100%",
        height: 32,
        borderBottomColor: "#fff",
        borderWidth: 1,
        borderColor: "#204051",
        color: "#fff",
        paddingLeft: 0,
        fontSize: 18,
        marginBottom: 19
    },
    avatar: {
        width: 160,
        height: 160,
        backgroundColor: "#fff",
        borderRadius: 80,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#06BBD8",
        borderRadius: 23,
        paddingHorizontal: 35,
        paddingVertical: 7,
        width: "50%",
    }
});