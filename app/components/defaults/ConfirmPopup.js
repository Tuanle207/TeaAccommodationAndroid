import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const ConfirmPopup = ({visible, setVisible, onRequestClose, onFinish, onCancel, text}) => {

    return (
        <Modal
            animationType='fade'
            visible={visible}
            transparent={true}
            onRequestClose={onRequestClose}
            onFinish={data => onFinish(data)}
            onCancel={onCancel}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <View style={{width: '80%', height: 150, backgroundColor: '#fff', borderRadius: 30}}>
                    <Text style={styles.content}>{ text }</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => setVisible(false)} style={styles.actions_button}>
                            <Text style={styles.actions_text}>HỦY</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => { setVisible(false); onFinish(); }} style={styles.actions_button}>
                            <Text style={styles.actions_text}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default ConfirmPopup;

const styles = StyleSheet.create({
    content: {
        margin: 25,
        textAlign: 'center',
        lineHeight: 20,
        letterSpacing: 1
    },
    actions: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'flex-end',
        marginTop: 'auto'
    },
    actions_button: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    actions_text: {
        color: '#ff3b7d'
    }
});