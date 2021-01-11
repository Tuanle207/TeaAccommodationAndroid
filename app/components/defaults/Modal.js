import React from 'react';
import { Modal as RawModal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

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
                        backgroundColor: '#edc988',
                        paddingVertical: 5,
                        paddingHorizontal: 10
                    }}>
                        <TouchableOpacity style={styles.navigation_button} onPress={() => setVisible(false)} >
                            <Text style={styles.button_text}>HỦY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.navigation_button, ...styles.navigation_button_yes}} onPress={() => {setVisible(false); onFinish();}} >
                            <Text style={styles.button_text_yes}>CHỌN</Text>
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
        paddingVertical: 5,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#db6400',
    },
    navigation_button_yes: {
        borderWidth: 2,
        borderColor: '#5aa469',
    },
    button_text: {
        color: '#ff3b7d'
    },
    button_text_yes: {
        color: '#5aa469'
    }
})
