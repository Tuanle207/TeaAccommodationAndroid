import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ToastAndroid, Modal, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import { getApartments } from '../../actions';
import ApartmentCard from '../defaults/ApartmentCard';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FrontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ApartmentListScreen  = ({navigation, getApartments, apartments, ui}) => {
    
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(getApartments, []);

    const isScrollToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - 20;
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
            <ApartmentCard navigation={navigation} item={item} />
        );
    };

    const renderDistrict = ({item}) => {
        return (
            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderBottomWidth: 1, 
                borderBottomColor: 'rgba(0,0,0,0.25)'
            }}>
                <Text>Quận 1</Text>
                <CheckBox boxType='square' />
            </View>
        );
    }

    return (
        <View style={{flex: 1, position: 'relative', backgroundColor: '#e8ffff'}}>
            <View style={styles.filter}>
                <Modal
                    animationType='fade'
                    visible={modalVisible}
                    transparent={true}
                    onRequestClose={() => {}}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                        <View style={{width: '80%', maxHeight: '75%', backgroundColor: '#fff'}}>
                            <View style={styles.modalActions}>
                                <Pressable onPress={() => setModalVisible(false)} >
                                    <EntypoIcon name={'cross'} size={12} color={'red'} />
                                </Pressable>
                                <Pressable onPress={() => setModalVisible(false)} >
                                    <EntypoIcon name={'check'} size={12} color={'red'} />
                                </Pressable>
                            </View>
                            <FlatList
                                data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}, {id: 13}]}
                                renderItem={renderDistrict}
                                keyExtractor={el => `${el.id}`}
                            /> 

                        </View>
                    </View>
                    
                </Modal>
                <Pressable style={styles.filterRow} 
                    onPress={() => setModalVisible(true)}>
                    <EntypoIcon name='location-pin' size={16} color='#000' />
                    <Text style={{marginRight: 'auto', marginLeft: 10}}>Quận</Text>
                    <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                </Pressable>
                <Pressable style={styles.filterRow} 
                    onPress={() => setModalVisible(true)}>
                    <MaterialIcon name='attach-money' size={16} color='#000' />
                    <Text style={{marginRight: 'auto', marginLeft: 10}}>Mức giá</Text>
                    <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                </Pressable>
                <Pressable style={styles.filterRow} 
                    onPress={() => setModalVisible(true)}>
                    <FrontAwesomeIcon name='home' size={16} color='#000' />
                    <Text style={{marginRight: 'auto', marginLeft: 10}}>Diện tích</Text>
                    <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                </Pressable>
                <Pressable style={styles.filterRow} 
                    onPress={() => setModalVisible(true)}>
                    <EntypoIcon name='tv' size={16} color='#000' />
                    <Text style={{marginRight: 'auto', marginLeft: 10}}>Tiện nghi</Text>
                    <EntypoIcon name='chevron-thin-right' size={16} color='#000' />
                </Pressable>
            </View>
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
    filter: {
        marginVertical: 15,
        paddingHorizontal: 10
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

    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    }
});

