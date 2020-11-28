import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { serverApi } from '../../../appsetting';
import { shortenMoneyAmount, shortenText }  from '../../utils';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FrontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function ApartmentCard({navigation, item}) {
    
    return (
        <Pressable style={styles.listItem}
        onPress={() => {console.log('asdsd'); navigation.push('Apartment', { id: item.id });}}
        key={item.id}
        >
            <ImageBackground style={styles.image} 
                source={{uri: `${serverApi}${item.photos[0]}`}}
                resizeMode={'cover'}
            >
                <View style={styles.info}>
                    <Text style={styles.titleText}>
                        {shortenText(item.title)}
                    </Text>
                    <View style={styles.infoDetail}>
                        <View style={styles.detail}>
                            <MaterialIcon name='attach-money' size={16} color='#e7e7de' />
                            <Text style={styles.detailText}>{shortenMoneyAmount(item.rent)} triệu/tháng</Text>
                        </View>
                        <View style={styles.detail}>
                            <FrontAwesomeIcon name='home' size={16} color='#e7e7de' />
                            <Text style={styles.detailText}>{item.area}㎡</Text>
                        </View>
                    </View>

                    <View style={styles.detail}>
                        <EntypoIcon name='location-pin' size={16} color='#e7e7de' />
                        <Text style={styles.detailText}>{`${item.address.district}, ${item.address.city}`}</Text>
                    </View>
                    <View style={styles.detail}>
                        <EntypoIcon name='clock' size={16} color='#e7e7de' />
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
        aspectRatio: 1,
        flex: 1
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

