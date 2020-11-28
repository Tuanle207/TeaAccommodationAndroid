import React from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Component } from 'react';
import { input, imageButton } from '../styles/userFeature.style';

export default class ChangePasswordScreen extends Component {
    render() {
        return (
            <View style={{paddingTop: 20, backgroundColor: '#204051'}}>
                <ScrollView style={{ width: '100%', height: '100%', backgroundColor: '#204051', paddingHorizontal: 30}}>
                    <Text style={input.label}>Mật khẩu cũ</Text>
                    <TextInput style={input.text} value={''}></TextInput>
                    <Text style={input.label}>Mật khẩu mới</Text>
                    <TextInput style={input.text} value={''}></TextInput>
                    <Text style={input.label}>Xác nhận mật khẩu mới</Text>
                    <TextInput style={input.text} value={''}></TextInput>
                </ScrollView>
            </View>
        );
    }
}