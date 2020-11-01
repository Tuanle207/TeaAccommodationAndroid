import React from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Component } from 'react';
import TittleStyle from '../styles/Tittle.style';
import TextStyle from '../styles/Text.style';

export default class UserScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: [{ title: 'Tên đăng nhập', value: 'Thanh Tuấn' },
            { title: 'Số điện thoại', value: '033333333' },
            { title: 'Địa chỉ', value: 'Quảng Ngãi' },
            { title: 'Email', value: 'thanhtuan2000dp@gmail.com' },
            { title: 'Loại tài khoản', value: 'Cho thuê' }
            ]
        }
    }

    renderItem = ({ item }) => (
        <View>
            <Text style={TextStyle.label}>{item.title}</Text>
            <Text style={TextStyle.input}>{item.value}</Text>
        </View>
    );

    render() {
        return (
            <View >
                <ScrollView style={{ width: '100%', height: '100%', backgroundColor: '#204051', paddingHorizontal: 20 }}>
                    <Text style={TittleStyle.tittle}>Trang cá nhân</Text>
                    <Image style={styles.avatar} />
                    <FlatList style={styles.list} data={this.state.info} renderItem={this.renderItem}
                        keyExtractor={item => item.title}
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.insideButton}>Chỉnh sửa trang cá nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.insideButton}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
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