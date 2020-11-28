import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ToastAndroid, Pressable, Platform, UIManager, LayoutAnimation, VirtualizedList, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { getApartments } from '../../../actions';
import ApartmentCard from '../../defaults/ApartmentCard';
import DistrictFilter from './DistrictFilter';
import { isEmpty } from '../../../utils';
import ListHeader from './ListHeader';
import Animated from 'react-native-reanimated';

const ApartmentListScreen  = ({navigation, getApartments, apartments, apartmentFilter, ui}) => {
        
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);

    useEffect(()=> {
        getApartments();
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true);
    }, []);

    useEffect(() => {
        // let fetchNeeded = true;

        // Object.keys(apartmentFilter).forEach(key => {
        //     if (!isEmpty(apartmentFilter[key]))
        //         fetchNeeded = true;
        // });

        // if (fetchNeeded)
        //     getApartments(apartmentFilter);
    }, [apartmentFilter, apartments]);

    const renderFooter = () => {
        return (
            isLoadingMore ? 
            <View style={{marginTop: 10, alignItems: 'center'}}>
                <ActivityIndicator size='small' />
            </View> : null
        );
    };

    const loadMoreData = () => {
        console.log('ending..');
        setIsLoadingMore(true);
        if (apartments.meta.currentPage + 1 <= apartments.meta.totalPages) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            getApartments({...apartmentFilter, page: apartments.meta.currentPage + 1});
        } else {
            ToastAndroid.show('Không còn phòng trọ nào!', ToastAndroid.SHORT)
        }
    };
    
    const renderItem = ({item}) => {
        return (
            <ApartmentCard navigation={navigation} item={item} />
        );
    };


    return (
        <View style={{flex: 1, position: 'relative', backgroundColor: '#e8ffff'}}>
            <DistrictFilter
                modalVisible={modalVisible1} 
                setModalVisible={setModalVisible1}
            />
            <FlatList style={{padding: 10}}
                data={apartments.data}
                renderItem={renderItem}
                keyExtractor={el => `${el.id}`}
                ListHeaderComponent={<ListHeader onRowPressHandlers={[
                    () => setModalVisible1(true),
                    () => setModalVisible2(true),
                    () => setModalVisible3(true),
                    () => setModalVisible4(true),
                    () => setModalVisible5(true),
                ]} />}
                refreshControl={<RefreshControl refreshing={refreshing} 
                onRefresh={getApartments} />}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const mapStateToProps = state => {
    return {
        apartments: state.apartments,
        apartmentFilter: state.input.apartmentFilter,
        ui: state.ui
    };
};

export default connect(mapStateToProps, {getApartments})(ApartmentListScreen);