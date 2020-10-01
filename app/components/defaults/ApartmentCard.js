import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SERVER_URL } from '@env';
import { shortenMoneyAmount, shortenText }  from '../../utils';
import CoinIcon from '../../assets/SVG/coin-dollar.svg';
import HomeIcon from '../../assets/SVG/home3.svg';
import LocationIcon from '../../assets/SVG/location.svg';
import ClockIcon from '../../assets/SVG/clock.svg';


export default function ApartmentCard({navigation, item}) {
    
    return (
        <Pressable style={styles.listItem}
        onPress={() => navigation.push('Apartment', { id: item.id })}
        >
            <ImageBackground style={styles.image} 
                source={{
                    uri: `${SERVER_URL}${item.photos[0]}`,
                    method: 'GET'
                }} 
                resizeMode={'cover'}>
                <View style={styles.info}>
                    <Text style={styles.titleText}>
                        {shortenText(item.title)}
                    </Text>
                    <View style={styles.infoDetail}>
                        <View style={styles.detail}>
                            <CoinIcon width={16} height={16} fill='#e7e7de' />
                        <Text style={styles.detailText}>{shortenMoneyAmount(item.rent)} triệu/tháng</Text>
                        </View>
                        <View style={styles.detail}>
                            <HomeIcon width={16} height={16} fill='#e7e7de' />
                            <Text style={styles.detailText}>{item.area}㎡</Text>
                        </View>
                    </View>

                    <View style={styles.detail}>
                        <LocationIcon width={16} height={16} fill='#e7e7de' />
                        <Text style={styles.detailText}>{`${item.address.district}, ${item.address.city}`}</Text>
                    </View>
                    <View style={styles.detail}>
                        <ClockIcon width={16} height={16} fill='#e7e7de' />
                        <Text style={{...styles.detailText, ...{fontSize: 12}}}>Đăng lúc: {item.postedAt}</Text>
                    </View>
                </View>
            </ImageBackground>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    listItem: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.25)'
    },
    image: {
        aspectRatio: 1
    },
    info: {
        padding: 10,
        backgroundColor: 'rgba(0,88,122,0.5)',
        marginTop: 'auto',
        color: '#fff'
    },
    infoDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 14,
        color: '#fca652'
    },
    detail: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    detailText: {
        marginLeft: 10,
        fontSize: 12,
        color: '#e7e7de'
    }
});

