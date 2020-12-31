import React from 'react';
import { Modal as RawModal, View, Pressable, StyleSheet, TouchableOpacity, Text } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Modal = ({children, visible, setVisible, onRequestClose, onFinish, onCancel}) => {
    
    return (
        <RawModal
            animationType='fade'
            visible={visible}
            transparent={true}
            onRequestClose={onRequestClose}
            onFinish={data => onFinish(data)}
            onCancel={onCancel}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <View style={{width: '80%', height: '75%', backgroundColor: '#fff'}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#edc988'
                    }}>
                        <TouchableOpacity style={styles.navigation_button} onPress={() => setVisible(false)} >
                            <Text style={styles.button_text}>Hủy</Text>
                            <EntypoIcon style={{marginTop: 3}} name={'cross'} size={18} color={'red'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.navigation_button, backgroundColor: 'green'}} onPress={() => {setVisible(false); onFinish();}} >
                            <Text style={styles.button_text}>Chọn</Text>
                            <EntypoIcon name={'check'} size={18} color={'red'} />
                        </TouchableOpacity>
                    </View>
                    {children}
                </View>
            </View>
        </RawModal>
    );
};

export default Modal;

const styles = StyleSheet.create({
    navigation_button: {
        flexGrow: 1,
        backgroundColor: '#e08f62',
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text: {
        marginRight: 10
    }
})
