import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { APARTMENT_STATUS, capitalize } from '../../utils';
import ApartmentCard from './ApartmentCard';

const MyApartmentCard = ({ navigation, item, 
    setMenuVisibility, setCurrentApartmentId}) => {

    const onPressHandler = id => {
        setCurrentApartmentId(id);
        setMenuVisibility(true);
    };

    return (
        <ApartmentCard navigation={navigation} item={item} >
            <View style={[
                {
                    position: 'absolute', 
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    backgroundColor: item.status === APARTMENT_STATUS.AVAILABLE ? 'rgba(255,136,75,0.7)' : 'rgba(239,79,79,0.8)',
                },
                {
                    transform: [
                        { rotateY: '45deg' },
                        { rotateX: '-20deg' }
                    ]
                }
            ]}>
                <Text style={[
                        {
                            color: '#fff',
                            fontWeight: 'bold',
                            letterSpacing: 2,
                            lineHeight: 16, 
                            top: 0, 
                            left: 0 
                        },
                        {
                            transform: [
                                { rotateY: '45deg' },
                                { rotateX: '20deg' }
                            ]
                        }
                    ]}
                    >
                    { item.status + ' trống' }
                </Text>
            </View>
           
            <TouchableOpacity style={{padding: 10, position: 'absolute', top: 5, right: 0}}
                onPress={() => onPressHandler(item.id)}>
                <EntypoIcon name='dots-three-vertical' size={24} color={'#30475e'} />
            </TouchableOpacity>
        </ApartmentCard>
    )
};

export default MyApartmentCard;