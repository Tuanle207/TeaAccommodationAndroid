import React, { useEffect, useReducer, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import Modal from '../../defaults/Modal';
import {getDistricts, filterApartment} from '../../../actions';
import { isEmpty } from '../../../utils'


const reducer = (state, action) => {
    console.log('to...');
    console.log(action.type);

    switch (action.type) {
        case 'init':
            return action.payload;
        case 'toogle':
            const newState = {...state};

            newState[action.payload.code].checked = action.payload.checked;

            return newState;

        default:
            return state;
    }
};

const toggleDistrict = (dispatch, checked, code) => {
    dispatch({
        type: 'toogle',
        payload: {
            checked,
            code
        }
    });
};

const DistrictFilter = ({modalVisible, getDistricts, filterApartment,
    setModalVisible, districts}) => {

    const [localDistrictsFilter, dispatch] = useReducer(reducer, {});

    useEffect(() => {
        if (districts.length === 0)
            getDistricts();
    }, []);

    useEffect(() => {
        if (districts?.length > 0) {
            const payload = {};
            districts.forEach(el => {
                payload[el.code] = {
                    checked: false,
                    data: el.name
                };
            });
            dispatch({
                type: 'init',
                payload
            });
        }
    }, [districts]);

    useEffect(() => {
        console.log(localDistrictsFilter);
    }, [localDistrictsFilter]);


    const renderDistrict = ({item}) => {
        return (
            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderBottomWidth: 1, 
                borderBottomColor: 'rgba(0,0,0,0.25)'
            }}>
                <Text>{item.name}</Text>
                <CheckBox boxType='square' 
                    value={localDistrictsFilter[item.code].checked} 
                    onValueChange={value => toggleDistrict(dispatch, value, item.code)}/>
            </View>
        );
    }

    return (
        <Modal
            visible={modalVisible}
            setVisible={visible => setModalVisible(visible)}
            onRequestClose={() => {console.log('quit');}}
            onFinish={() => filterApartment(localDistrictsFilter)}
        >
        {
            !isEmpty(districts) ? 
            (
                <FlatList
                data={districts}
                renderItem={renderDistrict}
                keyExtractor={el => `${el.code}`}
            />    
            )
            :
            <Text>Đang tải...</Text>
        }
            
            
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        districts: state.parameters.districts
    };
};

export default connect(mapStateToProps, {getDistricts, filterApartment})(DistrictFilter);