import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { isEmpty } from '../../../utils';

import Modal from './../../defaults/Modal';
import { filterApartment } from '../../../actions';
import { connect } from 'react-redux';


const LocationFilter = ({ modalVisible, setModalVisible, filterApartment }) => {

    const [coordinate, setCoordinate] = useState({latitude: 10.88015919427308, longitude: 106.80892746895552}); 

    const drawMarker = (coordinate) => {
        if (isEmpty(coordinate)) {
            return null;
        }
        return (
            <Marker
                coordinate={coordinate}
                pinColor={'#61b15a'}
                title={'Vị trí phòng trọ'}
            />
        );
    };

    useEffect(() => {
        console.log(modalVisible);
    }, [modalVisible]);

    return (
        <Modal
            visible={modalVisible}
            setVisible={visible => setModalVisible(visible)}
            onRequestClose={() => {console.log('quit');}}
            onFinish={() =>{ console.log('close'); filterApartment({type: 'coordinate', data: [coordinate.latitude, coordinate.longitude]}) }}
        >
            <Text style={styles.title}>Chọn vị trí của bạn trên bản đồ!</Text>
            <MapView
                onPress={(e) => setCoordinate(e.nativeEvent.coordinate)}
                initialRegion={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.005,
                }}
                style={{flex: 1, width: '100%', marginTop: 10}}>
                {drawMarker(coordinate)}
            </MapView>
        </Modal>
    );
};

export default connect(null, {filterApartment})(LocationFilter);

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        marginTop: 10
    }
});