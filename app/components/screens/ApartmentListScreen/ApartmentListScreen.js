import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ToastAndroid, Pressable, Platform, UIManager, LayoutAnimation, ActivityIndicator, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { getApartments } from '../../../actions';
import DistrictFilter from './DistrictFilter';
import { isEmpty } from '../../../utils';
import ListHeader from './ListHeader';
import Animated from 'react-native-reanimated';
import AnimatedLoader from 'react-native-animated-loader';
import LocationFilter from './LocationFilter';
import RentFilter from './RentFilter';
import AreaFilter from './AreaFilter';
import FacilityFilter from './FacilityFilter';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import SmallApartmentCard from '../../defaults/SmallApartmentCard';

const ApartmentListScreen  = ({navigation, getApartments, apartments, apartmentFilter, ui, errors}) => {
        
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [yPostion, setYPostion] = useState(0);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);

    
    const scroll = React.createRef();

    useEffect(()=> {
        console.log('getting apartments');
        getApartments(apartmentFilter);
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true);
    }, [apartmentFilter]);

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
        if (ui.fetchingApartments === false) {
            console.log('ending..');
            //console.log(apartments.meta);
            setIsLoadingMore(true);
            if (apartments.meta.currentPage + 1 <= apartments.meta.totalPages) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                getApartments({...apartmentFilter, page: apartments.meta.currentPage + 1});
            } else {
                ToastAndroid.show('Không còn phòng trọ nào!', ToastAndroid.SHORT)
            }
        }
    };
    
    const renderItem = ({item}) => {
        return (
            <SmallApartmentCard navigation={navigation} item={item} />
        );
    };

    if (errors.hasError === true) {
        ToastAndroid.showWithGravityAndOffset(errors.messages[0], 2, ToastAndroid.CENTER, 0, 0);
    }


    return (
        <View style={{flex: 1, position: 'relative', backgroundColor: '#e8ffff'}}>
            {
                ui.fetchingApartments === true &&
                <AnimatedLoader
                    visible={true}
                    overlayColor='rgba(0,0,0,0.5)'
                    source={require('../../../assets/2166-dotted-loader.json')}
                    animationStyle={{width: 100, height: 100}}
                    speed={1}
                />
            }
            <DistrictFilter
                modalVisible={modalVisible1} 
                setModalVisible={setModalVisible1}
            />
            <LocationFilter
                modalVisible={modalVisible2}
                setModalVisible={setModalVisible2}
            />
            <RentFilter 
                modalVisible={modalVisible3}
                setModalVisible={setModalVisible3}
            />
            <AreaFilter
                modalVisible={modalVisible4}
                setModalVisible={setModalVisible4}
                />
            <FacilityFilter
                modalVisible={modalVisible5}
                setModalVisible={setModalVisible5}
                />
            <FlatList style={{padding: 10}}
                ref={scroll}
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
                onScroll={e => setYPostion(e.nativeEvent.contentOffset.y)}
           />
            {
                yPostion > 30 &&
                <TouchableOpacity 
                    onPress={() => scroll.current.scrollToOffset({x: 0, y: 0, animated: true})}
                    style={{position: 'absolute', bottom: 20, right: 20, padding: 5, borderRadius: 100, borderWidth: 2, borderColor: '#11698e', backgroundColor: '#bedcfa'}}>
                    <AntDesignIcon name='arrowup' size={24} color={'#11698e'} />
                </TouchableOpacity>
            }
          
        </View>
    );
};

const mapStateToProps = state => {
    return {
        apartments: state.apartments,
        apartmentFilter: state.input.apartmentFilter,
        ui: state.ui,
        errors: state.errors
    };
};


export default connect(mapStateToProps, {getApartments})(ApartmentListScreen);