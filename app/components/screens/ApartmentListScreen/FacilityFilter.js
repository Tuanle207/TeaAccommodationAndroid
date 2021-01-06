import React, { useEffect, useReducer, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import Modal from '../../defaults/Modal';
import { filterApartment } from '../../../actions';
import { capitalize, isEmpty } from '../../../utils'

const facilitiesReducer = (state, action) => {
    
    let newState = [...state];

    switch (action.type) {
        case 'init': 
            return action.payload.map((el) => ({checked: false, value: el}));
        case 'toggle_all':
            Object.keys(newState).forEach(el => newState[el].checked = action.payload.checked);
            return newState;
        case 'check':
            newState[action.payload.index].checked = true;
            return newState;
        case 'uncheck':
            newState[action.payload.index].checked = false;
            return newState;
        default:
            return state;
    }
};


const FacilityFilter = ({modalVisible, setModalVisible, filterApartment, facilitiesData}) => {

    const [facilities, dispatchFacilities] = useReducer(facilitiesReducer, facilitiesData.map((el) => ({checked: false, value: el})));
    const [checkAll, setCheckAll] = useState(false);

    useEffect(() => {
        dispatchFacilities({
            type: 'init',
            payload: facilitiesData
        });
    }, [facilitiesData]);
    


    const renderFacilities = ({item, index}) => {
        console.log(item, index);
        return (
            <View   
            style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderBottomWidth: 1, 
                borderBottomColor: 'rgba(0,0,0,0.25)'
            }}>
                <Text>{capitalize(item)}</Text>
                <CheckBox boxType='square' 
                    value={facilities[index].checked} 
                    onValueChange={value => dispatchFacilities({
                        type: value ? 'check' : 'uncheck',
                        payload: {index}
                    })}/>
            </View>
        );
    }

    return (
        <Modal
            visible={modalVisible}
            setVisible={visible => setModalVisible(visible)}
            onRequestClose={() => {console.log('quit');}}
            onFinish={() => filterApartment({type: 'facilities', data: facilities.map(el => el.value)})}
        >
        {
            !isEmpty(facilitiesData) ? 
            (
                <FlatList
                data={facilitiesData}
                renderItem={renderFacilities}
                keyExtractor={el => `${el}`}
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
                            onValueChange={value => {
                                setCheckAll(value); 
                                dispatchFacilities({
                                    type: 'toggle_all',
                                    payload: {
                                        checked: value
                                    }
                                });
                            }}
                        />
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
        facilitiesData: state.parameters.facilities
    };
};

export default connect(mapStateToProps, {filterApartment})(FacilityFilter);