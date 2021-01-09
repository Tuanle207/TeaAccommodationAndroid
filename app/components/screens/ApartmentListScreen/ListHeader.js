
import React from 'react';
import { View, Pressable, StyleSheet, Text, ScrollView } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FrontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { isEmpty, shortenMoneyAmount, shortenText } from '../../../utils';
import { connect } from 'react-redux';

const ListHeader = ({onRowPressHandlers, apartmentFilter}) => {

    return (
        <View style={styles.filter}>
            <View style={styles.filterWrapper}>
                <View style={styles.menu_title_wrapper}>
                    <Text style={styles.menu_title}>BỘ LỌC</Text>
                </View>
                <Pressable style={{...styles.filterRow, ...styles.filterMainRow}} 
                    onPress={onRowPressHandlers[0]}>
                    <EntypoIcon name='location-pin' size={16} color='#000' />
                        <Text style={{marginRight: 'auto', marginLeft: 10}}>
                            Quận: {apartmentFilter.districts.length == 0 ? 
                            '' : 
                            `${shortenText(apartmentFilter.districts.join(', '), 24)}`}
                        </Text>
                    <EntypoIcon name='triangle-down' size={16} color='#000' />
                </Pressable>
                    
                <Pressable style={{...styles.filterRow, ...styles.filterMainRow}} 
                    onPress={onRowPressHandlers[1]}>
                    <FeatherIcon name='map' size={16} color='#000' />
                        <Text style={{marginRight: 'auto', marginLeft: 10}}>Địa điểm  -  chọn trên bản đồ</Text>
                    <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                </Pressable>
                <ScrollView 
                    horizontal={true} 
                    showsVerticalScrollIndicator ={false}
                    showsHorizontalScrollIndicator={false}
                    style={styles.content}>
                    
                    <Pressable style={styles.filterRow} 
                        onPress={onRowPressHandlers[2]}>
                        <MaterialIcon name='attach-money' size={16} color='#000' />
                            <Text style={{marginRight: 'auto', marginLeft: 10}}>
                                Mức giá: {isEmpty(apartmentFilter.rent) ? 
                                '' : 
                                `${shortenMoneyAmount(apartmentFilter.rent.min)} - ${shortenMoneyAmount(apartmentFilter.rent.max)} (triệu/tháng)`}
                            </Text>
                        <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                    </Pressable>
                    
                    
                    <Pressable style={styles.filterRow} 
                        onPress={onRowPressHandlers[3]}>
                        <FrontAwesomeIcon name='home' size={16} color='#000' />
                            <Text style={{marginRight: 'auto', marginLeft: 10}}>
                                Diện tích: {isEmpty(apartmentFilter.area) ? 
                                '' : 
                                `${apartmentFilter.area.min} - ${apartmentFilter.area.max} (㎡)`}
                            </Text>
                        <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                    </Pressable>
                    
                    <Pressable style={styles.filterRow}
                        onPress={onRowPressHandlers[4]}>
                        <EntypoIcon name='tv' size={16} color='#000' />
                            <Text style={{marginRight: 'auto', marginLeft: 10}}>Tiện nghi</Text>
                        <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                    </Pressable>
                    
                </ScrollView>  
            </View>
        </View>
    );
};

const mapStateToProps = state => {
    return {
        apartmentFilter: state.input.apartmentFilter
    };
};

export default connect(mapStateToProps, null)(ListHeader);

const styles = StyleSheet.create({
    filter: {
        paddingTop: 10,
        marginBottom: 10,
        backgroundColor: 'transparent',
        flexDirection: 'column',
    },
    menu_title_wrapper: {
        backgroundColor: '#db6400',
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        position: 'absolute',
        top: -10,
        left: 20,
        zIndex: 1
    },
    menu_title: {
        letterSpacing: 1
    },
    filterWrapper: {
        position: 'relative',
        paddingTop: 35,
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffba93',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.25)',
        marginBottom: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        minWidth: 200
    },
    filterMainRow: {
        flexGrow: 1,
    },
    expandView: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginLeft: 10,
    },
    expandText: {
        fontSize: 12,
        marginRight: 10
    },
    expandButton: {
        paddingVertical: 5,
        paddingHorizontal: 25,
        flexDirection: 'row',
        borderWidth: 1,
        marginBottom: 5,
        alignItems: 'center'
    }
});