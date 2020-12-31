import React, { useEffect, useState } from 'react';
import { Platform, UIManager, View, Pressable, LayoutAnimation, StyleSheet, Text } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FrontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { isEmpty, shortenMoneyAmount, shortenText } from '../../../utils';
import { connect } from 'react-redux';

const ListHeader = ({onRowPressHandlers, apartmentFilter}) => {

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'android')
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }, []);

    const changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.filter}>
            <View style={styles.content}>
                <Pressable style={styles.filterRow} 
                    onPress={onRowPressHandlers[0]}>
                    <EntypoIcon name='location-pin' size={16} color='#000' />
                        <Text style={{marginRight: 'auto', marginLeft: 10}}>
                            Quận: {apartmentFilter.districts.length == 0 ? 
                            '' : 
                            `${shortenText(apartmentFilter.districts.join(', '), 20)}`}
                        </Text>
                    <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                </Pressable>
                {expanded &&
                <Pressable style={styles.filterRow} 
                    onPress={onRowPressHandlers[1]}>
                    <FeatherIcon name='map' size={16} color='#000' />
                        <Text style={{marginRight: 'auto', marginLeft: 10}}>Địa điểm</Text>
                    <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                </Pressable>
                }
                {expanded &&
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
                }
                {expanded &&
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
                }
                {expanded &&
                <Pressable style={styles.filterRow}
                    onPress={onRowPressHandlers[4]}>
                    <EntypoIcon name='tv' size={16} color='#000' />
                        <Text style={{marginRight: 'auto', marginLeft: 10}}>Tiện nghi</Text>
                    <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                </Pressable>
                }
            </View>
            <View style={styles.expandView}>
                {
                    !expanded ? 
                    <Pressable style={styles.expandButton} onPress={changeLayout}>
                        <Text style={styles.expandText}>Nâng cao</Text>
                        <FrontAwesomeIcon name='angle-double-down' size={16} color='#000' />
                    </Pressable>
                    :
                    <Pressable style={styles.expandButton} onPress={changeLayout}>
                        <FrontAwesomeIcon name='angle-double-up' size={16} color='#000'/>
                    </Pressable>

                }
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
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flexGrow: 1
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.25)',
        marginBottom: 5
    },
    expandView: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginLeft: 10
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

