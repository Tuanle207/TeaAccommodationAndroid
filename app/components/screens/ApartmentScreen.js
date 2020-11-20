import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    StatusBar,
    Button,
    ScrollView,
    TextInput,
    FlatList,
    BackHandler,
    Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {serverApi} from '../../../appsetting';
import {getApartment} from '../../actions';
import {connect} from 'react-redux';
import apartmentDetail from '../../reducers/apartmentDetail.reducer';
import Icon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MapView, {Circle, Marker} from 'react-native-maps';
import {isEmpty, shortenMoneyAmount, shortenTextt} from '../../utils';
import {WebView} from 'react-native-webview';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';

const testData = {
    id: 10000,
    title: 'phòng trọ xịn xò',
    description: 'phòng trọ xịn xò có high không bar',
    postedBy: {
        id: 10000,
        name: 'Le Anh Tuan',
        photo: '/photo/user/1762936515371600082097.jpg',
    },
    postedAt: '2020-09-14 20:36:22',
    lastUpdatedAt: '2020-09-14 20:36:22',
    address: {
        street: '20A Linh Trung',
        ward: 'Linh Trung',
        district: 'Quận 1',
        city: 'Hồ Chí Minh',
        latitude: 10.871423,
        longitude: 106.79287,
    },
    rent: 2000000,
    area: 50,
    phoneContact: '01224578226',
    photos: [
        '/photo/apartment/1873166584041600082151.jpg',
        '/photo/apartment/1124777360771600082151.png',
        '/photo/apartment/1494061589331600082151.png',
        '/photo/apartment/2223613102441600082151.jpg',
    ],
    facilities: ['wifi'],
    rating: null,
    status: 'còn phòng',
};

const ApartmentScreen = ({route, getApartment, apartmentDetails}) => {
    //const {id} = route.params;
    const [photoIndex, setPhotoIndex] = useState(0);
    const [photoView, setPhotoView] = useState(false);
    const [coordinate, setCoordinate] = useState({});

    // useEffect(() => {
    //     if (apartmentDetails.findIndex(el => el.id === id) === -1) {
    //         getApartment();
    //     }
    // }, []);

    useEffect(() => {
        const handleBack = () => {
            console.log('handling...');
            if (photoView) {
                console.log('back');
                setPhotoView(false);
            }
            return true;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBack);
        //checkLoggedIn({navigation});

        // test opening Google Map using intend
        // const url = Platform.select({
        //     android: `google.navigation:q=${10.840670},${106.769619}`
        // });
        // openExternalApp(url);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBack);
        };
    }, []);

    const onPressMarkHandler = (e) => {
        // console.log('i am clicked!');
        // console.log(e.nativeEvent.coordinate);
    };

    const drawMarker = (coordinate) => {
        if (isEmpty(coordinate)) {
            return null;
        }
        return (
            <Marker
                onPress={onPressMarkHandler}
                coordinate={coordinate}
                icon={{uri: require('../../assets/pin.png')}}
                pinColor={'green'}
                title={'Vị trí phòng trọ'}
            />
        );
    };

    const renderPhotos = (photos) =>
        photos.map((photo, index) => {
            return (
                <Pressable
                    style={styles.slide}
                    key={index}
                    onPress={() => setPhotoView(true)}>
                    <Image
                        style={styles.image}
                        source={{uri: `${serverApi}${photo}`}}
                    />
                </Pressable>
            );
        });

    const renderUserCurrentRating = (userRating) => {
        for (let i = 0; i < userRating; i++) {
            <FoundationIcon name="star" size={12} color={'#000'} />;
        }
    };

    const renderFacilities = (data) => {
        data.map((el) => {
            return (
                <View>
                    {/* <Icon/> */}
                    <Text>{el}</Text>
                </View>
            );
        });
    };

    return (
        <ScrollView style={{flex: 1}}>
            <Swiper
                style={styles.wrapper}
                onIndexChanged={(index) => setPhotoIndex(index)}
                showsButtons={false}
                loop={true}
                showsPagination={true}
                index={photoIndex}
                removeClippedSubviews={false}
                loadMinimalSize={2}
                dotColor={'#fff'}
                activeDotColor={'#32e0c4'}
                containerStyle={{alignSelf: 'stretch'}}>
                {renderPhotos(testData.photos)}
            </Swiper>
            {
                photoView &&
                <Modal
                    style={styles.photo_view_modal}
                    visible={true}
                    transparent={true}
                    onBackButtonPress={() => setPhotoView(false)}>
                    <ImageViewer
                        index={photoIndex}
                        imageUrls={testData.photos.map((el) => {
                            return {url: `${serverApi}${el}`};
                        })}
                    />
                </Modal>
            }
            <View style={styles.apartment_detail}>
                <View style={styles.user_rating}>
                    <Pressable>
                        <FoundationIcon
                            style={styles.title_rating_icon}
                            name="star"
                            size={24}
                            color={'red'}
                        />
                    </Pressable>
                    <Pressable>
                        <FoundationIcon
                            style={styles.title_rating_icon}
                            name="star"
                            size={24}
                            color={'red'}
                        />
                    </Pressable>
                    <Pressable>
                        <FoundationIcon
                            style={styles.title_rating_icon}
                            name="star"
                            size={24}
                            color={'red'}
                        />
                    </Pressable>
                    <Pressable>
                        <FoundationIcon
                            style={styles.title_rating_icon}
                            name="star"
                            size={24}
                            color={'red'}
                        />
                    </Pressable>
                    <Pressable>
                        <FoundationIcon
                            style={styles.title_rating_icon}
                            name="star"
                            size={24}
                            color={'red'}
                        />
                    </Pressable>
                </View>
                <View style={styles.title}>
                    <Text style={styles.title_text}>{testData.title}</Text>
                    <Text style={styles.description_text}>
                        {testData.description}
                    </Text>
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name="calendar"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>Đăng lúc:</Text>
                    <Text style={styles.detail_row_value}>
                        {testData.postedAt}
                    </Text>
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name="user"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>Người đăng: </Text>
                    <Text style={styles.detail_row_value}>
                        {testData.rating}
                    </Text>
                </View>
                <View style={styles.detail_row}>
                    <FoundationIcon
                        style={styles.detail_row_icon}
                        name="star"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>Xếp hạng: </Text>
                    <Text style={styles.detail_row_value}> {4.7} </Text>
                    <FoundationIcon name="star" size={14} color="#F0A500" />
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name="dollar"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>Giá thuê: </Text>
                    <Text style={styles.detail_row_value}>{testData.rent}</Text>
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name="home"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>Diện tích: </Text>
                    <Text style={styles.detail_row_value}>{testData.area}</Text>
                </View>

                <View style={styles.detail_row}>
                    <EvilIcons
                        style={styles.detail_row_icon}
                        name="location"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>Địa chỉ: </Text>
                    <Text style={styles.detail_row_value}>
                        {testData.address.city}{' '}
                    </Text>
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name="television"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>Tiện nghi: </Text>
                    <View>{renderFacilities(testData.facilities)}</View>
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name="phone"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>Liên hệ: </Text>
                    <Text style={styles.detail_row_value}>
                        {' '}
                        {testData.phoneContact}{' '}
                    </Text>
                </View>

                <View style={styles.detail_row}>
                    <IoniconsIcon
                        style={styles.detail_row_icon}
                        name="checkmark"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>
                        Cập nhật lần cuối:{' '}
                    </Text>
                    <Text style={styles.detail_row_value}>
                        {' '}
                        {testData.lastUpdatedAt}{' '}
                    </Text>
                </View>

                <View style={{...styles.detail_row, ...styles.detail_row_wrap}}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name="map"
                        size={16}
                        color="#000"
                    />
                    <Text style={styles.detail_row_text}>Vị trí: </Text>
                    <MapView
                        initialRegion={{
                            latitude: 10.881182,
                            longitude: 106.806602,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.005,
                        }}
                        style={{height: 400, width: '100%', marginTop: 20}}>
                        {drawMarker(coordinate)}
                    </MapView>
                </View>
                <Pressable style={styles.btn_navigation}>
                    <Text style={styles.btn_navigation_text}>Chỉ đường</Text>
                    <FeatherIcon
                        name="corner-right-up"
                        size={16}
                        color="#000"
                    />
                </Pressable>
            </View>

            <View style={styles.comment_section}>
                <Text style={styles.comment_section_text}>Bình luận</Text>
                <Text style={styles.force_login}>
                    <Pressable style={styles.force_login_btn}>
                        <Text style={styles.force_login_btn_text}>
                            Đăng nhập
                        </Text>
                    </Pressable>
                    <Text> để thêm bình luận và xếp hạng cho phòng trọ</Text>
                </Text>

                <View style={styles.newComment}>
                    {/* <Image/> */}
                    <TextInput placeholder="Bình luận về phòng trọ" />
                    <View>
                        {/* <Icon/> */}
                        {/* <Icon/> */}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return {
        apartmentDetails: state.apartmentDetails,
    };
};

export default connect(mapStateToProps, {getApartment})(ApartmentScreen);

const styles = StyleSheet.create({
    wrapper: {
        height: 300,
        borderWidth: 1,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: 400,
    },
    photo_view_modal: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        margin: 0
    },
    // apartment details
    apartment_detail: {
        padding: 10,
    },
    user_rating: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        marginVertical: 10,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    title_rating_icon: {
        padding: 5,
    },
    detail_row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        // borderWidth: 1
    },
    detail_row_wrap: {
        flexWrap: 'wrap',
    },
    detail_row_icon: {
        width: 20,
        height: 20,
        textAlign: 'center',
        lineHeight: 20,
    },
    detail_row_text: {
        marginLeft: 10,
    },
    detail_row_value: {
        // marginLeft: 'auto',
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        // borderWidth: 1,
    },
    btn_navigation: {
        flexDirection: 'row',
        backgroundColor: '#FF9A8C',
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    btn_navigation_text: {
        marginRight: 5,
    },

    // comment section
    comment_section: {
        padding: 10,
    },
    comment_section_text: {
        fontSize: 16,
        fontWeight: 'bold',
        borderBottomWidth: 1,
    },
    force_login: {
        borderWidth: 1,
    },
    force_login_btn: {
        borderWidth: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    force_login_btn_text: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
});
