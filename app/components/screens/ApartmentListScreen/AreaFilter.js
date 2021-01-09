import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from './../../defaults/Modal';
import { filterApartment } from '../../../actions';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


const AreaFilter = ({ modalVisible, setModalVisible, filterApartment }) => {

    const [area, setArea] = useState({min: 0, max: 200});

    useEffect(() => {
        console.log(modalVisible);
    }, [modalVisible]);

    return (
        <Modal
            visible={modalVisible}
            setVisible={visible => setModalVisible(visible)}
            onRequestClose={() => {console.log('quit');}}
            onFinish={() =>{ console.log('close'); filterApartment({type: 'area', data: area }) }}
        >
            <View style={styles.row_text}>
                <Text>Diện tích từ </Text>
                <Text style={styles.text_value}>{area.min} ㎡</Text>
                <Text> đến </Text>
                <Text style={styles.text_value}>{area.max} ㎡</Text>
            </View>
            

            <View style={styles.range_input}>
                <View style={{marginRight: 10, alignItems: 'center'}}>
                    <Text style={styles.text_value}>0</Text>
                    <Text>㎡</Text>
                </View>
                <MultiSlider
                    sliderLength={200}
                    markerSize={100}
                    min={0}
                    max={200}
                    step={10}
                    values={[area.min, area.max]}
                    onValuesChange={numbers => setArea({min: numbers[0], max: numbers[1]}) }
                />
                <View style={{marginLeft: 10, alignItems: 'center'}}>
                    <Text style={styles.text_value}>200</Text>
                    <Text>㎡</Text>
                </View>
                 
            </View>

         
        </Modal>
    );
};

export default connect(null, {filterApartment})(AreaFilter);

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