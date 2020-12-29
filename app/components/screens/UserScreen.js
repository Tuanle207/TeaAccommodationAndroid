import React, { useEffect} from 'react';
import { Text, View, Image, StyleSheet,TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { topic, input } from '../styles/userFeature.style';
import { checkLoggedIn} from '../../actions';
import { connect } from 'react-redux';
import { serverApi } from '../../../appsetting';

const UserScreen = ({ checkLoggedIn, navigation, user, fetchingData}) => {
    const translateRoleUser = () => {
        if(user.data.role == 'landlord')
            return 'Cho thuê trọ';
        else
            return 'Tìm trọ';
    }
    useEffect(() => {
        checkLoggedIn({ navigation });

        return () => {
            console.log('unmounting...');
        }
    }, []);

    if (fetchingData || !user.auth) {
        return (
            <View>
                <Text>Loading User's Information</Text>
            </View>
        )
    }
    return (
        <View >
            <ScrollView style={{width: '100%', height: '100%', backgroundColor: '#204051', paddingHorizontal: 30}}>
                <Text style={topic.style}>Trang cá nhân</Text>
                <Image style={styles.avatar} source={{uri:`${serverApi}${user.data.photo}`}}/>
                <Text style={input.label}>Họ và tên</Text>
                <Text style={input.text}>{user.data.name}</Text>
                <Text style={input.label}>Số điện thoại</Text>
                <Text style={input.text}>{user.data.phoneNumber}</Text>
                <Text style={input.label}>Email</Text>
                <Text style={input.text}>{user.data.email}</Text>
                <Text style={input.label}>Loại tài khoản</Text>
                <Text style={input.text}>{translateRoleUser()}</Text>
                <View style={{marginTop: 10}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("UpdateUser")}>
                        <Text style={styles.insideButton}>Chỉnh sửa trang cá nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChangePassword")}>
                        <Text style={styles.insideButton}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default connect(
    state => ({
        user: state.user,
        fetchingData: state.ui.fetchingData
    }),
    { checkLoggedIn })(UserScreen);

const styles = StyleSheet.create({
    avatar: {
        height: 160,
        width: 160,
        borderRadius: 80,
        alignSelf: 'center',
        marginTop: 16,
        backgroundColor: "white",
        marginBottom: 16
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