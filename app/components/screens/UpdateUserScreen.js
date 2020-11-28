import React, {useLayoutEffect} from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Component } from 'react';
import { input, imageButton, navigationTittle } from '../styles/userFeature.style';

export default class UpdateUserScreen extends Component {

    //Test moving screen by headerLeft but it error
    render() {
        // useLayoutEffect(() => {
        //     this.props.navigation.setOptions({
        //         title: 'Chỉnh sửa trang cá nhân',
        //         headerTitleStyle: navigationTittle.style,
        //         headerStyle: { backgroundColor: '#132833', height: 53 },
        //         headerLeft: () => (
        //             <Icon.Button name="close" color='#D9D9D9' backgroundColor='#132833' size={30}
        //             onPress={() => this.props.navigation.navigate("User")}
        //             ></Icon.Button>
        //         ),
        //         headerRight: () => (
        //             <Icon.Button name='check' color='#06BBD8' backgroundColor='#132833' size={30}></Icon.Button>
        //         )
        //     })
        // }, [this.props.navigation])
        return (
            <View>
                <ScrollView style={{ width: '100%', height: '100%', backgroundColor: '#204051', paddingHorizontal: 30 }}>
                    <View style={{ alignItems: "center", marginBottom: 28 }}>
                        <Image style={styles.avatar}></Image>
                        <TouchableOpacity>
                            <Text style={imageButton.style}>Chọn ảnh đại diện</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={input.label}>Tên đăng nhập</Text>
                    <TextInput style={input.text} value={'Nguyễn Thanh Tuấn'}></TextInput>
                    <Text style={input.label}>Số điện thoại</Text>
                    <TextInput style={input.text} value={'033333333'}></TextInput>
                    <Text style={input.label}>Địa chỉ</Text>
                    <TextInput style={input.text} value={'Quảng Ngãi'}></TextInput>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 80,
        alignSelf: 'center',
        marginTop: 16,
        backgroundColor: "white",

    },
    list: {
        margin: 10,
        flex: 1,
    },
    button: {
        height: 40,
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'center',
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