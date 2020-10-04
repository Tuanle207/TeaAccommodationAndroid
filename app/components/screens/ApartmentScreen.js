import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Image, Pressable, StatusBar, Button} from 'react-native';
import Swiper from 'react-native-swiper';
import { SERVER_URL } from '@env';
import { getApartment } from '../../actions';
import { connect } from 'react-redux';
import apartmentDetail from '../../reducers/apartmentDetail.reducer';
import Icon from 'react-native-vector-icons/FontAwesome';

const testData = [
    '/photo/apartment/1819196029851600082245.jpg',
    '/photo/apartment/1055221558001600082245.png',
    '/photo/apartment/1432890372621600082245.png',
    '/photo/apartment/1791743584081600082245.jpg',
    '/photo/test.jpg'
];

const ApartmentScreen = ({route, getApartment, apartmentDetails}) => {
    const {id} = route.params;
    const [photoIndex, setPhotoIndex] = useState(0);
    const [photoView, setPhotoView] = useState(false);

    useEffect(() => {
        if (apartmentDetails.findIndex(el => el.id === id) === -1) {
            getApartment({id});
        }
    }, []);

    const positionPhoto = () => {
        if (photoView) {
            return {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 500,
                zIndex: 10
            }
        }
        return {

        };
    };

    const renderPhotos = photos => {
        return photos.map((photo, index) => {
            return (
                <Pressable style={styles.slide} key={index} 
                    onPress={() => setPhotoIndex(index)}>
                    <Text>{'gege'}</Text>
                    <Image style={styles.image}
                        source={{uri: `${SERVER_URL}${photo}`}} />
                </Pressable>
            );
        })
    }
    if (apartmentDetails.findIndex(el => el.id === id) !== -1) {
        const detail = apartmentDetails.find(el => el.id === id);
        console.log(detail);
        return (
            <View style={{flex: 1}}>
                <Swiper style={styles.wrapper} 
                    showsButtons={false} 
                    loop={false}
                    showsPagination={false}
                    index={photoIndex}>
                    {renderPhotos(detail.photos)}
                </Swiper>
                <Text>{detail.title}</Text>
                <Icon name='rocket' size={30} color='#000' />
            </View>
        );
    }
    return (
        <View style={{flex: 1}}>
            <Swiper style={styles.wrapper} 
                showsButtons={false} 
                loop={false}
                showsPagination={false}
                index={photoIndex}>
                {renderPhotos(testData)}
            </Swiper>
            <Text></Text>
        </View>
        
    );
};

const mapStateToProps = state => {
    return {
        apartmentDetails: state.apartmentDetails
    }
}

export default connect(mapStateToProps, {getApartment})(ApartmentScreen);

const styles = StyleSheet.create({
    wrapper: {

    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: 'cover',
        flex: 1
    }
});