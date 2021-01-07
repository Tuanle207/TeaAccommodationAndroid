import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    TextInput,
    Dimensions,
    Platform,
    Linking,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {serverApi} from '../../../appsetting';
import {getApartment} from '../../actions';
import {connect} from 'react-redux';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MapView, {Circle, Marker} from 'react-native-maps';
import {formatDatetime, isEmpty, shortenMoneyAmount, shortenText} from '../../utils';
import serverRequest from '../../apis/serverRequest';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AnimatedLoader from 'react-native-animated-loader';


const ApartmentScreen = ({route, getApartment, apartmentDetails, user, ui}) => {
    const {id} = route.params;
    const [photoIndex, setPhotoIndex] = useState(0);
    const [photoView, setPhotoView] = useState(false);
    const [userRating, setUserRating] = useState(-1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('alooooo');
        console.log(apartmentDetails);
        
        if (apartmentDetails != null && apartmentDetails.findIndex(el => el.id === id) === -1) {
            getApartment({id});
            serverRequest
                .get(`/apartments/${id}/ratings`)
                .then(res => {
                    const { data } =res.data;
                    setUserRating(data.rating);
                })
                .catch(err => setUserRating(-1));
        }
    }, []);

    const onNavigateBtnPressHandler = () => {
        const detail = apartmentDetails.find(el => el.id === id);
        
        // opening Google Map using intend
        const url = Platform.select({
            android: `google.navigation:q=${detail.address.latitude},${detail.address.longitude}`
        });
        Linking.canOpenURL(url).then(support => {
            if (support) {
                Linking.openURL(url);
            }
            else {
                //...
            }
        });
    };


    const onPressMarkHandler = (e) => {
        // console.log('i am clicked!');
        // console.log(e.nativeEvent.coordinate);
    };

    const onRatingButtonHandler = async (rating, id) =>  {

        // const currRating = rating;
        // setUserRating(rating);
        // setLoading(true);
        // try {
        //     await serverRequest.post(`/apartments/${id}/ratings`, { rating: userRating });
        //     ToastAndroid.show('Xếp hạng phòng trọ thành công!');
        // }
        // catch (err) {
        //     console.log(err);
        //     setUserRating(currRating);
        //     ToastAndroid.show('Đã có lỗi xảy ra');
        // }
        // finally {
        //     setLoading(false);
        // }
    };

    const renderPhotos = (photos) =>
        photos.map((photo, index) => {
            return (
                <TouchableOpacity
                    style={styles.slide}
                    key={index}
                    onPress={() => setPhotoView(true)}>
                    <Image
                        style={styles.image}
                        source={{uri: `${serverApi}${photo}`}}
                    />
                </TouchableOpacity>
            );
        });

    const renderUserCurrentRating = userRating => {

        return [1, 2, 3, 4, 5].map(i => {
            return (
                <TouchableOpacity onPress={() => onRatingButtonHandler(i, id)}>
                    {
                        i <= userRating ? 
                        <FoundationIcon style={styles.title_rating_icon} name='star' size={24} color={'green'} /> :
                        <FoundationIcon style={styles.title_rating_icon} name='star' size={24} color={'#cfdac8'} />
                    }
                </TouchableOpacity>
            );
        });
    };

    const renderFacilities = (data) => {
        if (data.length > 0)
            return data.map((el) => {
                return (
                    <View style={{flexDirection: 'row', alignItems: 'center'}} key={el}>
                        <View style={{width: 6, height: 6, marginTop: 3, borderRadius: 3, backgroundColor: '#000', marginRight: 10}}></View>
                        <Text>{el}</Text>
                    </View>
                );
            });

        return <Text style={styles.detail_row_value}>Cơ bản</Text>
    };

    //console.log('incomingggggggggggggggggggg');
    //console.log(apartmentDetails);

    if (ui.fetchingApartment || apartmentDetails.findIndex(el => el.id === id) === -1) {
        return(
            <SkeletonPlaceholder>
               <View style={{ flexDirection: 'column' }}>
                    <View style={{width: '100%', height: 300}} />
                    <View style={{padding: 10}}>
                        <View style={{ marginVertical: 10, borderRadius: 25, height: 20, width: 200}} />
                        <View style={{ marginVertical: 5, borderRadius: 25, height: 20, width: 300}} />
                        <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ borderRadius: 20, height: 25, width: 100}} />
                            <View style={{ borderRadius: 20, height: 25, width: 200}} />
                        </View>
                        <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ borderRadius: 20, height: 25, width: 120}} />
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 'auto'}}>
                                <View style={{ borderRadius: 20, height: 40, width: 40, marginRight: 10}} />
                                <View style={{ borderRadius: 20, height: 25, width: 120}} />
                            </View>
                        </View>
                    </View>
                </View>
            </SkeletonPlaceholder>
        );
    }

    const detail = apartmentDetails.find(el => el.id === id);

    return (
        <ScrollView style={{flex: 1}}>
            {
                loading === true &&
                <AnimatedLoader
                    visible={true}
                    overlayColor='rgba(0,0,0,0.5)'
                    source={require('../../assets/2166-dotted-loader.json')}
                    animationStyle={{width: 100, height: 100}}
                    speed={1}
                />
            }
            <Swiper
                style={styles.wrapper}
                //onIndexChanged={(index) => setPhotoIndex(index)}
                showsButtons={false}
                loop={true}
                showsPagination={true}
                index={photoIndex}
                removeClippedSubviews={false}
                loadMinimalSize={2}
                dotColor={'#fff'}
                activeDotColor={'#32e0c4'}
                containerStyle={{alignSelf: 'stretch'}}>
                {renderPhotos(detail.photos)}
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
                        imageUrls={detail.photos.map((el) => {
                            return {url: `${serverApi}${el}`};
                        })}
                    />
                </Modal>
            }
            <View style={styles.apartment_detail}>
                {
                    user.auth === true ?
                    (
                    <View style={styles.user_rating}>
                        <Text>Xếp hạng của bạn: </Text>
                        { 
                            renderUserCurrentRating(userRating)
                        }
                    </View>
                    )
                    :
                    <Text style={{alignSelf: 'center', fontSize: 12}} >Đăng nhập để xếp hạng phòng trọ này!</Text>
                }
                <View style={styles.title}>
                    <Text style={styles.title_text}>{detail.title}</Text>
                    <Text style={styles.description_text}>
                        {detail.description}
                    </Text>
                </View>
                
                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name='calendar'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>Đăng lúc:</Text>
                    <Text style={styles.detail_row_value}>
                        { formatDatetime(detail.postedAt) }
                    </Text>
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name='user'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>Người đăng: </Text>
                    <Image style={styles.detail_row_user} source={{uri: `${serverApi}${detail.postedBy.photo}`}} />
                    <Text>
                        {detail.postedBy.name}
                    </Text>
                </View>
                <View style={styles.detail_row}>
                    <FoundationIcon
                        style={styles.detail_row_icon}
                        name='star'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>Xếp hạng: </Text>
                    <Text style={styles.detail_row_value}> {detail.rating ? detail.rating : 'Chưa được xếp hạng'} </Text>
                    {
                        detail.rating &&
                        <FoundationIcon name='star' size={14} color='#F0A500' />
                    }
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name='dollar'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>Giá thuê: </Text>
                    <Text style={styles.detail_row_value}>{shortenMoneyAmount(detail.rent)} triệu/tháng</Text>
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name='home'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>Diện tích: </Text>
                    <Text style={styles.detail_row_value}>{detail.area}㎡</Text>
                </View>

                <View style={{...styles.detail_row, alignItems: 'flex-start'}}>
                    <EvilIcons
                        style={styles.detail_row_icon}
                        name='location'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>Địa chỉ: </Text>
                    <Text style={{...styles.detail_row_value, ...styles.long_detail_row_value}}>
                        {` ${detail.address.street}, ${detail.address.ward}, ${detail.address.district}`}{' '}
                    </Text>
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name='television'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>Tiện nghi: </Text>
                    <View style={styles.detail_row_value}>{renderFacilities(detail.facilities)}</View>
                </View>

                <View style={styles.detail_row}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name='phone'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>Liên hệ: </Text>
                    <Text style={styles.detail_row_value}>
                        {' '}
                        {detail.phoneContact}{' '}
                    </Text>
                </View>

                <View style={styles.detail_row}>
                    <IoniconsIcon
                        style={styles.detail_row_icon}
                        name='checkmark'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>
                        Cập nhật lần cuối:{' '}
                    </Text>
                    <Text style={styles.detail_row_value}>
                        {' '}
                        { formatDatetime(detail.lastUpdatedAt) }{' '}
                    </Text>
                </View>

                <View style={{...styles.detail_row, ...styles.detail_row_wrap}}>
                    <FontAwesome
                        style={styles.detail_row_icon}
                        name='map'
                        size={16}
                        color='#000'
                    />
                    <Text style={styles.detail_row_text}>Vị trí: </Text>
                    {/* <MapView
                        initialRegion={{
                            latitude: detail.address.latitude,
                            longitude: detail.address.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.005,
                        }}
                        style={{height: 400, width: '100%', marginTop: 20}}>
                        {drawMarker({latitude: detail.address.latitude, longitude: detail.address.longitude})}
                    </MapView> */}
                </View>
                <Pressable onPress={onNavigateBtnPressHandler} style={styles.btn_navigation}>
                    <Text style={styles.btn_navigation_text}>Chỉ đường</Text>
                    <FeatherIcon
                        name='corner-right-up'
                        size={16}
                        color='#000'
                    />
                </Pressable>
            </View>

            <View style={styles.comment_section}>
                <Text style={styles.comment_section_text}>Bình luận</Text>
                {
                    user.auth === false ? 
                    (
                    <View style={styles.force_login}>
                        <Pressable style={styles.force_login_btn}>
                            <Text style={styles.force_login_btn_text}>
                                Đăng nhập
                            </Text>
                        </Pressable>
                        <Text style={styles.force_login_text}>để thêm bình luận cho phòng trọ!</Text>
                    </View>
                    )
                    :
                    (
                    <View style={styles.new_comment}>
                        <Image style={styles.new_comment_user} source={{uri: `${serverApi}${detail.postedBy.photo}`}} />
                        <TextInput style={styles.new_comment_input} multiline={true} maxLength={200} textAlignVertical={'top'} numberOfLines={4} placeholder='Bình luận về phòng trọ' />
                        <View style={styles.new_comment_action}>
                            <Pressable>
                                <EntypoIcon style={styles.new_comment_icon} name='attachment' size={24} color={'#000'}/>
                            </Pressable>
                            <Pressable>
                                <IoniconsIcon style={styles.new_comment_icon} name='send' size={24} color={'#000'} />
                            </Pressable>
                        </View>
                    </View>
                    )
                }

                <View style={styles.comment_list}>
                    <View style={styles.commment_item}>
                        <Image style={styles.comment_user} source={{uri: `${serverApi}${detail.postedBy.photo}`}} />
                        <View styles={styles.comment_content}>
                            <Text style={styles.comment_username}>{detail.postedBy.name}</Text>
                            <Text style={styles.comment_text}>{'Phòng trọ khá rộng rãi thoải mái, chủ trọ thân thiện.'}</Text>
                            <Image style={styles.comment_img} source={{uri: `${serverApi}${detail.photos[0]}`}}/>
                        </View>
                    </View>
                    <View style={styles.commment_item}>
                        <Image style={styles.comment_user} source={{uri: `${serverApi}${detail.postedBy.photo}`}} />
                        <View styles={styles.comment_content}>
                            <Text style={styles.comment_username}>{detail.postedBy.name}</Text>
                            <Text style={styles.comment_text}>{'Phòng trọ khá rộng rãi thoải mái, chủ trọ thân thiện.'}</Text>
                            <Image style={styles.comment_img} source={{uri: `${serverApi}${detail.photos[0]}`}}/>
                        </View>
                    </View>
                    <View style={styles.commment_item}>
                        <Image style={styles.comment_user} source={{uri: `${serverApi}${detail.postedBy.photo}`}} />
                        <View styles={styles.comment_content}>
                            <Text style={styles.comment_username}>{detail.postedBy.name}</Text>
                            <Text style={styles.comment_text}>{'Phòng trọ khá rộng rãi thoải mái, chủ trọ thân thiện.'}</Text>
                            <Image style={styles.comment_img} source={{uri: `${serverApi}${detail.photos[0]}`}}/>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return {
        apartmentDetails: state.apartmentDetails,
        user: state.user,
        ui: state.ui
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
        alignItems: 'center'
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
    detail_row_user: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
        marginLeft: 'auto'
    },
    detail_row_value: {
        // marginLeft: 'auto',
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        // borderWidth: 1,
    },
    long_detail_row_value: {
        maxWidth: 150,
        textAlign: 'right'
    },
    detail_row_value_supperscript: {
        fontSize: 10,
        textAlignVertical: 'top',
        marginBottom: 5
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
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    force_login_btn: {
        padding: 5
    },
    force_login_btn_text: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    force_login_text: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    new_comment: {
        flexDirection: 'row'
    },
    new_comment_user: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginTop: 10,
        marginRight: 5
    },
    new_comment_input: {
        marginVertical: 10,
        height: 100,
        borderWidth: 1,
        borderColor: '#1A2438',
        backgroundColor: '#DBF6E9',
        borderRadius: 10,
        flex: 1
    },
    new_comment_action: {
        justifyContent: 'space-between',
        marginLeft: 5,
        marginVertical: 10
    },
    new_comment_icon: {
        padding: 5
    },
    commment_item: {
        flexDirection: 'row',
        marginVertical: 10
    },
    comment_user: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 5
    },
    comment_content: {
        alignItems: 'center',
        flexShrink: 1
    },
    comment_username: {
        fontWeight: 'bold'
    },
    comment_text: {

    }
});
