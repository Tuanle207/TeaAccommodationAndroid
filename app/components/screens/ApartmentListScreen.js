import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet, RefreshControl, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { getApartments } from '../../actions';
import { SERVER_URL } from '@env';
import { shortenMoneyAmount, shortenText }  from '../../utils';
import CoinIcon from '../../assets/SVG/coin-dollar.svg';
import HomeIcon from '../../assets/SVG/home3.svg';
import LocationIcon from '../../assets/SVG/location.svg';
import ClockIcon from '../../assets/SVG/clock.svg';

const ApartmentListScreen  = ({navigation, getApartments, apartments, ui}) => {
    
    const [refreshing, setRefreshing] = useState(false);
    useEffect(getApartments, []);

    const isScrollToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - 20;
    };

    const isDisplay = condition => {
        return {
            display: condition ? 'flex' : 'none'
        };
    };

    const onScrollToBottomHandler = () => {
        if (apartments.meta.currentPage + 1 <= apartments.meta.totalPages) {
            getApartments({page: apartments.meta.currentPage + 1});
        } else {
            ToastAndroid.show('Không còn phòng trọ nào!', ToastAndroid.SHORT)
        }
    };

    const renderItem = ({item}) => {
        return (
            <Pressable style={styles.listItem}
                onPress={() => navigation.push('Apartment', { id: item.id })}
            >
                <Image style={styles.image} 
                    source={{
                        uri: `${SERVER_URL}${item.photos[0]}`,
                        method: 'GET'
                    }} 
                    resizeMode={'cover'}/>
                <View style={styles.info}>
                    <Text style={styles.titleText}>
                        {shortenText(item.title)}
                    </Text>
                    <View style={styles.infoDetail}>
                        <View style={styles.rent}>
                           <CoinIcon width={16} height={16} fill='red' />
                           <Text style={styles.rentText}>{shortenMoneyAmount(item.rent)} triệu/tháng</Text>
                        </View>
                        <View style={styles.rent}>
                            <HomeIcon width={16} height={16} fill='red' />
                            <Text style={styles.rentText}>{item.area}㎡</Text>
                        </View>
                      
                    </View>
                    <View style={styles.rent}>
                        <LocationIcon width={16} height={16} fill='red' />
                        <Text style={styles.rentText}>{`${item.address.district}, ${item.address.city}`}</Text>
                    </View>
                    <View style={styles.rent}>
                        <ClockIcon width={16} height={16} fill='red' />
                        <Text style={{...styles.rentText, ...{fontSize: 12}}}>Đăng lúc: {item.postedAt}</Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    // if (ui.fetchingData) {
    //     return (
    //         <View>
    //             <Text>Fetching data....</Text>
    //         </View>
    //     )
    // }
    
    return (
        <View style={{flex: 1, position: 'relative'}}>
            <FlatList style={{padding: 10}}
            data={apartments.data}
            renderItem={renderItem}
            keyExtractor={el => `${el.id}`}
            refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={getApartments} />}
            onMomentumScrollEnd={e => (isScrollToBottom(e.nativeEvent) && onScrollToBottomHandler())}
            />
        </View>
    );
};

const mapStateToProps = state => {
    return {
        apartments: state.apartments,
        ui: state.ui
    };
};

export default connect(mapStateToProps, {getApartments})(ApartmentListScreen);

const styles = StyleSheet.create({
    listItem: {
        marginBottom: 20,
        borderWidth: 1
    },
    image: {
        height: 200
    },
    info: {
        padding: 10,
    },
    infoDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 14
    },
    rent: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    rentText: {
        marginLeft: 10,
        fontSize: 12
    }
});

