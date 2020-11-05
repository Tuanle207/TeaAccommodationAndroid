import React from 'react';
import { Modal as RawModal, View, Pressable } from 'react-native';
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
                        padding: 10,
                        backgroundColor: '#edc988'
                    }}>
                        <Pressable onPress={() => setVisible(false)} >
                            <EntypoIcon name={'cross'} size={16} color={'red'} />
                        </Pressable>
                        <Pressable onPress={() => {setVisible(false); onFinish();}} >
                            <EntypoIcon name={'check'} size={16} color={'red'} />
                        </Pressable>
                    </View>
                    {children}
                </View>
            </View>
        </RawModal>
    );
};

export default Modal;