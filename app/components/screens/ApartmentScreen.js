import React, { useState } from 'react';
import {Text, View, StyleSheet, Image, Pressable, StatusBar} from 'react-native';
import Swiper from 'react-native-swiper';
import { SERVER_URL } from '@env';


const testData = [
    '/photo/apartment/1819196029851600082245.jpg',
    '/photo/apartment/1055221558001600082245.png',
    '/photo/apartment/1432890372621600082245.png',
    '/photo/apartment/1791743584081600082245.jpg',
    '/photo/test.jpg'
];

const ApartmentScreen = ({route}) => {
    const {id} = route.params;
    const [photoIndex, setPhotoIndex] = useState(0);
    const [photoView, setPhotoView] = useState(false);

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
                    <Image style={styles.image}
                        source={{uri: `${SERVER_URL}${photo}`}} />
                </Pressable>
            );
        })
    }
    return (
        <Swiper style={styles.wrapper} 
            showsButtons={false} 
            loop={false}
            showsPagination={false}
            index={photoIndex}>
           {renderPhotos(testData)}
         </Swiper>
    );
};

export default ApartmentScreen;

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative'
    },
    slide: {
        width: '100%'
    },
    image: {
        height: 200,
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 500,
        zIndex: 10
    }
});