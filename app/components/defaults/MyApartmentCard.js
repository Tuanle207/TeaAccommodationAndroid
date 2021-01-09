import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ApartmentCard from './ApartmentCard';

const MyApartmentCard = ({ navigation, item, menuVisibility, 
    setMenuVisibility, setCurrentApartmentId}) => {

    const onPressHandler = id => {
        setCurrentApartmentId(id);
        setMenuVisibility(true);
    };

    return (
        <ApartmentCard navigation={navigation} item={item} >
           <TouchableOpacity style={{padding: 10, position: 'absolute', top: 5, right: 0}}
                onPress={() => onPressHandler(item.id)}>
                <EntypoIcon name='dots-three-vertical' size={24} color={'#30475e'} />
            </TouchableOpacity>
        </ApartmentCard>
    )
};

export default MyApartmentCard;