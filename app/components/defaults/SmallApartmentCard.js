import React from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { serverApi } from '../../../appsetting';
import { calculateTime, shortenMoneyAmount, shortenText }  from '../../utils';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FrontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function SmallApartmentCard({children, navigation, item}) {
    
    return (
        <Pressable style={styles.listItem}
        onPress={() => {console.log('asdsd'); navigation.push('Chi Tiết phòng trọ', { id: item.id });}}
        key={item.id}
        >
            <Image style={styles.image} 
                source={{uri: `${serverApi}/${item.photos[0]}`}}
                resizeMode={'cover'}
            />
            <View style={styles.info}>
                <Text style={styles.titleText}>
                    {shortenText(item.title, 120)}
                </Text>
                <View style={styles.detail}>
                    {/* <MaterialIcon name='attach-money' size={16} color='#e7e7de' /> */}
                    <Text style={{...styles.detailText,...styles.mainDetail}}>{shortenMoneyAmount(item.rent)} triệu/tháng</Text>
                </View>
                <View style={styles.infoDetail}>
                    <View style={styles.detail}>
                        {/* <FrontAwesomeIcon name='home' size={16} color='#e7e7de' /> */}
                        <Text style={styles.detailText}>{item.area}㎡</Text>
                    </View>
                    <View style={styles.detail}>
                    {/* <EntypoIcon name='location-pin' size={16} color='#e7e7de' /> */}
                    <Text style={styles.detailText}>{item.address.district}</Text>
                </View>
                </View>
                <View style={styles.detail}>
                    {/* <EntypoIcon name='clock' size={16} color='#e7e7de' /> */}
                    <Text style={{...styles.detailText, ...{fontSize: 10}}}>{calculateTime(item.postedAt)}</Text>
                </View>
            </View>
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    listItem: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.25)',
        position: 'relative',
        width: 160
    },
    image: {
        height: 160
    },
    info: {
        marginTop: 'auto',
        color: '#2c061f',
    },
    infoDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        marginTop: 5,
        fontSize: 14,
        textTransform: 'uppercase',
        color: '#000'
    },
    detail: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    detailText: {
        fontSize: 12,
        color: '#000'
    },
    mainDetail: {
        color: '#ff577f',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

