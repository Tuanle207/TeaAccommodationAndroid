import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ToastAndroid, Platform, UIManager, LayoutAnimation, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { getMyApartments } from '../../../actions';
import MyApartmentCard from '../../defaults/MyApartmentCard';
import Animated from 'react-native-reanimated';
import AnimatedLoader from 'react-native-animated-loader';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
  
import ConfirmPopup from '../../defaults/ConfirmPopup';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MeterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo'

const { SlideInMenu } = renderers;

const MyApartmentScreen  = ({navigation, getMyApartments, myApartments, ui, errors}) => {
        
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [yPostion, setYPostion] = useState(0);
    const [menuVisibility, setMenuVisibility] = useState(false);
    const [currentApartmentId, setCurrentApartmentId] = useState(-1);
    const [popupStatusVisibility, setPopupStatusVisibility] = useState(false);
    const [popupDeleteVisibility, setPopupDeleteVisibility] = useState(false);

    const scroll = React.createRef();

    useEffect(()=> {
        getMyApartments();
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true);
    }, []);
    
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
            setIsLoadingMore(true);
            if (myApartments.meta.currentPage + 1 <= myApartments.meta.totalPages) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                getMyApartments({page: myApartments.meta.currentPage + 1});
            } else {
                ToastAndroid.show('Không còn phòng trọ nào!', ToastAndroid.SHORT)
            }
        }
    };
    
    const renderItem = ({item}) => {
        return (
            <MyApartmentCard 
                navigation={navigation} 
                item={item} 
                menuVisibility={menuVisibility} 
                setMenuVisibility={setMenuVisibility}
                setCurrentApartmentId={setCurrentApartmentId}
            />
        );
    };

    const updateApartment = id => {
        if (id != -1)
            navigation.push('Cập nhật thông tin phòng trọ');
    }

    if (errors.hasError === true) {
        ToastAndroid.showWithGravityAndOffset(errors.messages[0], 2, ToastAndroid.CENTER, 0, 0);
    }


    return (
        <View
            style={{flex: 1, position: 'relative', backgroundColor: '#e8ffff'}}>
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

            <ConfirmPopup 
                visible={popupStatusVisibility} 
                setVisible={setPopupStatusVisibility} 
                text={'Xác nhận chuyển trạng thái phòng trọ này thành hết phòng?'}/>
            <ConfirmPopup 
                visible={popupDeleteVisibility} 
                setVisible={setPopupDeleteVisibility} 
                text={'Xác nhận xóa phòng trọ này?'}/>

            <Menu opened={menuVisibility} onBackdropPress={() => setMenuVisibility(false)} renderer={SlideInMenu}>
                <MenuTrigger  />
                <MenuOptions optionsContainerStyle={styles.menu}>
                    {/* <MenuOption onSelect={() => updateApartment(currentApartmentId)}>
                        
                    </MenuOption> */}
                    <View style={styles.menu_title_wrapper}>
                        <Text style={styles.menu_title}>TÙY CHỌN</Text>
                    </View>
                    <TouchableOpacity onPress={() => {setMenuVisibility(false); updateApartment(currentApartmentId)}} style={styles.menu_row_item}>
                        <MeterialIcons name={'upgrade'} size={24} color={'#ffc764'} />
                        <View style={styles.menu_item_text_wrapper}>
                            <Text style={styles.menu_item_text}>Cập nhật thông tin</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setMenuVisibility(false); setPopupStatusVisibility(true)}} style={styles.menu_row_item}>
                        <FontAwesomeIcon name={'battery-empty'} size={24} color={'#ffc764'} />
                        <View style={styles.menu_item_text_wrapper}>
                            <Text style={styles.menu_item_text}>Tạm hết phòng trống</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setMenuVisibility(false); setPopupDeleteVisibility(true)}} style={styles.menu_row_item}>
                            <MeterialIcons name={'delete'} size={24} color={'#ffc764'} />
                            <View style={styles.menu_item_text_wrapper}>
                                <Text style={styles.menu_item_text}>Xóa</Text>
                            </View>
                    </TouchableOpacity>
                </MenuOptions>
            </Menu>

            <FlatList style={{padding: 10}}
                ref={scroll}
                data={myApartments.data}
                renderItem={renderItem}
                keyExtractor={el => `${el.id}`}
                refreshControl={<RefreshControl refreshing={refreshing} 
                onRefresh={getMyApartments} />}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                onScroll={e => setYPostion(e.nativeEvent.contentOffset.y)}
           />
            {
                yPostion > 30 ?
                <TouchableOpacity onPress={() => scroll.current.scrollToOffset({x: 0, y: 0, animated: true})}
                    style={{position: 'absolute', bottom: 20, right: 20, padding: 5, borderRadius: 100, borderWidth: 2, borderColor: '#11698e', backgroundColor: '#bedcfa'}}>
                    <AntDesignIcon name='arrowup' size={24} color={'#11698e'} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => navigation.push('Thêm phòng trọ mới')} style={{position: 'absolute', bottom: 20, right: 20, padding: 5, borderRadius: 100, borderWidth: 2, borderColor: '#fc8621', backgroundColor: '#f4eeed'}}>
                    <EntypoIcon name='plus' size={24} color={'#fc8621'} />
                </TouchableOpacity>
            }
          
        </View>
    );
};

const mapStateToProps = state => {
    return {
        myApartments: state.myApartments,
        ui: state.ui,
        errors: state.errors
    };
};


export default connect(mapStateToProps, {getMyApartments})(MyApartmentScreen);

const styles = StyleSheet.create({
    menu: {
        paddingHorizontal: 20, 
        paddingVertical: 30, 
        backgroundColor: '#30475e',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        position: 'relative'
    },
    menu_title_wrapper: {
        position: 'absolute',
        top: -40,
        left: 25,
        backgroundColor: '#db6400',
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    menu_title: {
        letterSpacing: 1
    },
    menu_row_item: {
        flexDirection: 'row',  
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffc764'
    },
    menu_item_text_wrapper: {
        marginLeft: 'auto',
        minWidth: 150
    },
    menu_item_text: {
        color: '#fff',    
    }
})