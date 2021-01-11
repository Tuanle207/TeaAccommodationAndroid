import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ToastAndroid, Platform, UIManager, LayoutAnimation, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { changeApartmentStatus, deleteApartment, getMyApartments } from '../../actions';
import MyApartmentCard from '../defaults/MyApartmentCard';
import Animated from 'react-native-reanimated';
import AnimatedLoader from 'react-native-animated-loader';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
  
import ConfirmPopup from '../defaults/ConfirmPopup';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MeterialIcons from 'react-native-vector-icons/MaterialIcons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { APARTMENT_MODIFICATION_TYPE, APARTMENT_STATUS, ROLE_TYPE } from '../../utils';
import { ScreenNames } from '../Navigation/NavigationConst';

const { SlideInMenu } = renderers;

const MyApartmentScreen  = ({navigation, changeApartmentStatus, deleteApartment, getMyApartments, myApartments, ui, user, errors}) => {
        
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [yPostion, setYPostion] = useState(0);
    const [menuVisibility, setMenuVisibility] = useState(false);
    const [currentApartmentId, setCurrentApartmentId] = useState(-1);
    const [popupAvailableStatusVisibility, setPopupAvailableStatusVisibility] = useState(false);
    const [popupFullStatusVisibility, setPopupFullStatusVisibility] = useState(false);
    const [popupDeleteVisibility, setPopupDeleteVisibility] = useState(false);

    const scroll = React.createRef();

    useEffect(()=> {
        console.log('my apartment');
        console.log(user);
        getMyApartments();
        if (Platform.OS === 'android')
            UIManager.setLayoutAnimationEnabledExperimental(true);
    }, []);

    useEffect(() => {
        console.log('ok');
        console.log(myApartments);
        if (myApartments.data.length > 0)
            setCurrentApartmentId(myApartments.data[0].id);
    }, [myApartments]);

    // useEffect(() => {
    //     if (ui.reloadMyApartment === true) 
    //         getMyApartments();
    // }, [ui]);
    
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

    const onChangeStatusBtnPressHandler = () => {
        setMenuVisibility(false);
        const apartment = myApartments.data.find(el => el.id === currentApartmentId);
        if (apartment.status === APARTMENT_STATUS.FULL)
            setPopupAvailableStatusVisibility(true);
        else
            setPopupFullStatusVisibility(true);
        
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
            navigation.push(ScreenNames.UPDATE_APARTMENT, { id: id, type: APARTMENT_MODIFICATION_TYPE.UPDATION });
    }

    if (errors.hasError === true) {
        ToastAndroid.showWithGravityAndOffset(errors.messages[0], 2, ToastAndroid.CENTER, 0, 0);
    }

    if (user.auth === false || (user.auth === true && user.data.role === ROLE_TYPE.NORMAL_USER)) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bạn cần là chủ trọ để sử dụng tính năng này!</Text>
                <Text style={{ marginTop: 10 }}>Hãy đăng nhập với tài khoản chủ trọ để tiếp tục!</Text>
            </View>
        );
    } 

    return (
        <View
            style={{flex: 1, position: 'relative', backgroundColor: '#e8ffff'}}>
            {
                (ui.fetchingApartments === true && ui.changingApartmentStatus === true) &&
                <AnimatedLoader
                    visible={true}
                    overlayColor='rgba(0,0,0,0.5)'
                    source={require('../../assets/2166-dotted-loader.json')}
                    animationStyle={{width: 100, height: 100}}
                    speed={1}
                />
            }

            <ConfirmPopup 
                visible={popupFullStatusVisibility} 
                setVisible={setPopupFullStatusVisibility} 
                text={'Xác nhận chuyển trạng thái phòng trọ này thành HẾT PHÒNG?'}
                onFinish={ () => changeApartmentStatus({ id: currentApartmentId, status: APARTMENT_STATUS.FULL }) } />
            <ConfirmPopup 
                visible={popupAvailableStatusVisibility} 
                setVisible={setPopupAvailableStatusVisibility} 
                text={'Xác nhận chuyển trạng thái phòng trọ này thành CÒN PHÒNG?'}
                onFinish={ () => changeApartmentStatus({ id: currentApartmentId, status: APARTMENT_STATUS.AVAILABLE }) } />
            <ConfirmPopup 
                visible={popupDeleteVisibility} 
                setVisible={setPopupDeleteVisibility} 
                onFinish={ () => deleteApartment({ id: currentApartmentId }) }
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
                    <TouchableOpacity onPress={ onChangeStatusBtnPressHandler } style={styles.menu_row_item}>
                        {
                            currentApartmentId === -1 || myApartments.data.findIndex(el => el.id === currentApartmentId) === -1 ?
                            null :
                            myApartments.data.find(el => el.id === currentApartmentId).status === APARTMENT_STATUS.AVAILABLE ?
                            <FoundationIcon name={'battery-full'} size={24} color={'#ffc764'} /> : 
                            <FoundationIcon name={'battery-empty'} size={24} color={'#ffc764'} />
                        }
                        <View style={styles.menu_item_text_wrapper}>
                            {
                                currentApartmentId === -1 || myApartments.data.findIndex(el => el.id === currentApartmentId) === -1 ?
                                null :
                                myApartments.data.find(el => el.id === currentApartmentId).status === APARTMENT_STATUS.AVAILABLE ?
                                <Text style={styles.menu_item_text}>Đã hết phòng trống</Text> : 
                                <Text style={styles.menu_item_text}>Đã có phòng trống</Text>
                            }
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
            {
                myApartments.data.length > 0 ?
                <FlatList style={{padding: 10}}
                    ref={scroll}
                    data={myApartments.data}
                    renderItem={renderItem}
                    keyExtractor={el => `${el.id}`}
                    refreshControl={<RefreshControl refreshing={refreshing} 
                    onRefresh={getMyApartments} />}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                    onScroll={e => setYPostion(e.nativeEvent.contentOffset.y)} /> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bạn chưa đăng phòng trọ nào!</Text>
                    <Text style={{ marginTop: 10 }}>Hãy tạo 1 bài đăng mới!</Text>
                </View>
            }
           
            {
                yPostion > 30 ?
                <TouchableOpacity onPress={() => scroll.current.scrollToOffset({x: 0, y: 0, animated: true})}
                    style={{position: 'absolute', bottom: 20, right: 20, padding: 5, borderRadius: 100, borderWidth: 2, borderColor: '#11698e', backgroundColor: '#bedcfa'}}>
                    <AntDesignIcon name='arrowup' size={24} color={'#11698e'} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => navigation.push(ScreenNames.CREATE_APARTMENT, {id: null, type: APARTMENT_MODIFICATION_TYPE.CREATION})} 
                    style={[
                        {position: 'absolute', bottom: 20, right: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 12, borderRadius: 5, borderWidth: 2, borderColor: '#fc8621', backgroundColor: '#f4eeed'},
                        {
                            // transform: [{ rotate: '-90deg' }]
                        }
                    ]}>
                    {/* <AntDesignIcon name='pluscircleo' size={24} color={'#fc8621'} /> */}
                    <Text style={[
                        {
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#fc8621',
                        },
                        {
                            // transform: [{ rotate: '180deg' }]
                        }
                    ]}>Đăng phòng trọ mới ?</Text>
                </TouchableOpacity>
            }
          
        </View>
    );
};

const mapStateToProps = state => {
    return {
        myApartments: state.myApartments,
        ui: state.ui,
        user: state.user,
        errors: state.errors
    };
};


export default connect(mapStateToProps, { getMyApartments, changeApartmentStatus, deleteApartment })(MyApartmentScreen);

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