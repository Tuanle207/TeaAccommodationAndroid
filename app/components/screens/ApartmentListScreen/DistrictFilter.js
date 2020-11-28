import React, { useEffect, useReducer, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import Modal from '../../defaults/Modal';
import {getDistricts, filterApartment} from '../../../actions';
import { isEmpty } from '../../../utils'


const reducer = (state, action) => {
    
    let newState = {...state};

    switch (action.type) {
        case 'init':
            return action.payload;
        case 'toggle_all':
            action.payload.code.forEach(el => newState[el] = action.payload.checked);
            return newState;
        case 'toogle':
            newState = {...state};

            newState[action.payload.code].checked = action.payload.checked;

            return newState;

        default:
            return state;
    }
};

const toggleDistrict = (dispatch, checked, code) => {
    if (Array.isArray(code))
        dispatch({
            type: 'toogle_all',
            payload: {
                check,
                code
            }
        });
    else
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
    const [checkAll, setCheckAll] = useState(true);

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
                ListHeaderComponent={( 
                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderBottomWidth: 1, 
                        borderBottomColor: 'rgba(0,0,0,0.25)'
                    }}>
                        <Text>{'Tất cả'}</Text>
                        <CheckBox boxType='square' 
                            value={checkAll} 
                            onValueChange={value => toggleDistrict(dispatch, value, districts.map(el => el.code))}/>
                    </View>
                    
                )}
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