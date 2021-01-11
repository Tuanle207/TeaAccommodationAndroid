import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from './../../defaults/Modal';
import { filterApartment } from '../../../actions';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderMaker from '../../defaults/SliderMaker';


const RentFilter = ({ modalVisible, setModalVisible, filterApartment }) => {

    const [rent, setRent] = useState({min: 0, max: 20});

    useEffect(() => {
        console.log(modalVisible);
    }, [modalVisible]);

    return (
        <Modal
            visible={modalVisible}
            setVisible={visible => setModalVisible(visible)}
            onRequestClose={() => {console.log('quit');}}
            onFinish={() =>{ console.log('close'); filterApartment({type: 'rent', data: {min: rent.min * 1000000, max: rent.max * 1000000}}) }}
        >
            <View style={styles.row_text}>
                <Text>Giá thuê từ </Text>
                <Text style={styles.text_value}>{rent.min} triệu</Text>
                <Text> đến </Text>
                <Text style={styles.text_value}>{rent.max} triệu</Text>
            </View>
            

            <View style={styles.range_input}>
                <View style={{marginRight: 10, alignItems: 'center'}}>
                    <Text style={styles.text_value}>0</Text>
                    <Text>triệu</Text>
                </View>
                <MultiSlider
                    sliderLength={200}
                    markerSize={100}
                    min={0}
                    max={20}
                    step={1}
                    isMarkersSeparated={true}
                    customMarkerLeft={e => (<SliderMaker color={'#db6400'} />)}
                    customMarkerRight={e => (<SliderMaker color={'#5aa469'} />)}
                    values={[rent.min, rent.max]}
                    onValuesChange={numbers => setRent({min: numbers[0], max: numbers[1]}) }
                />
                <View style={{marginLeft: 10, alignItems: 'center'}}>
                    <Text style={styles.text_value}>20</Text>
                    <Text>triệu</Text>
                </View>
                 
            </View>

         
        </Modal>
    );
};

export default connect(null, {filterApartment})(RentFilter);

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    range_input: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    row_text: {
        flexDirection: 'row',
        marginVertical: 10,
        marginTop: 40,
        alignSelf: 'center'
    },
    row_title: {
        width: 150
    },
    text_value: {
        fontWeight: 'bold'
    }
});