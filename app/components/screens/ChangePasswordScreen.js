import React ,{useEffect} from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { input } from '../styles/userFeature.style';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { checkLoggedIn, changePassword} from '../../actions';


const ChangePasswordScreen = ({checkLoggedIn, user, navigation, changePassword}) => {
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setpasswordConfirm] = React.useState('');

    useEffect(() => {
        checkLoggedIn({ navigation });
        return () => {
            console.log('unmounting...');
        }
    }, []);

    return (
        <View>
            <View style={{ backgroundColor: '#132833', height: 53, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Icon.Button name="close" color='#D9D9D9' backgroundColor='transparent' size={30} onPress={() => navigation.navigate('User')}></Icon.Button>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#fff",
                    justifyContent: 'center',
                    paddingHorizontal: 50
                }}>Đổi mật khẩu</Text>
                <Icon.Button name='check' color='#06BBD8' backgroundColor='transparent' size={30} onPress={()=> changePassword({user, currentPassword, password, passwordConfirm, navigation})}></Icon.Button>
            </View>
            <ScrollView style={{ width: '100%', height: '100%', backgroundColor: '#204051', paddingHorizontal: 30, paddingTop: 30 }}>
                <Text style={input.label}>Mật khẩu cũ</Text>
                <TextInput style={input.text} onChangeText={(e)=>{setCurrentPassword(e.valueOf())}}></TextInput>
                <Text style={input.label}>Mật khẩu mới</Text>
                <TextInput style={input.text} onChangeText={(e)=>{setPassword(e.valueOf())}}></TextInput>
                <Text style={input.label}>Xác nhận mật khẩu mới</Text>
                <TextInput style={input.text} onChangeText={(e)=>{setpasswordConfirm(e.valueOf())}}></TextInput>
            </ScrollView>
        </View>
    );
}
export default connect(state => ({
    user: state.user,
    fetchingData: state.ui.fetchingData
}), {checkLoggedIn, changePassword})(ChangePasswordScreen);