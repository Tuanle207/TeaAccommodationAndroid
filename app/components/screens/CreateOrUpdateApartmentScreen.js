import CheckBox from '@react-native-community/checkbox';
import React, { useState, useReducer, useEffect, useRef } from 'react';
import { 
    Image, 
    KeyboardAvoidingView, 
    Platform, 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    TextInput, 
    TouchableOpacity
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { APARTMENT_MODIFICATION_TYPE, isEmpty, ROLE_TYPE } from '../../utils';
import { createApartment, getApartment, updateApartment } from '../../actions';
import { MARGIN_MEDIUM } from '../styles/default.value';
import { connect } from 'react-redux';
import addressRequest from '../../apis/addressRequest';
import { bingMapApi, bingMapApiKey } from '../../apis/bingMapApi';
import AnimatedLoader from 'react-native-animated-loader';
import { serverApi } from '../../../appsetting';

const photosReducer = (state, action) => {
    
    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        case 'remove':
            const newState = [...state];
            newState.splice(action.payload.id, 1);
            return newState;
        case 'init':
            return action.payload;
        default:
            return state;
    }
};

const facilitiesReducer = (state, action) => {
    
    let newState = [...state];

    switch (action.type) {
        case 'check':
            newState[action.payload.index].checked = true;
            return newState;
        case 'uncheck':
            newState[action.payload.index].checked = false;
            return newState;
        case 'init':
            return action.payload;
        default:
            return state;
    }
};

const TYPE = {
    CREATION: 0,
    UPDATION: 1
}

const CreateOrUpdateApartmentScreen = ({ route, navigation, createApartment, updateApartment, getApartment, user, ui, apartmentDetails, facilitiesData }) => {
    
    const { type, id } = route.params;

    const [photos, dispatchPhotos] = useReducer(photosReducer, []);
    const [title, setTitle] = useState('Phòng trọ xịn xò');
    const [description, setDescription] = useState('Phòng xò xịn nhất Việt Name');
    const [rent, setRent] = useState('2500000');
    const [area, setArea] = useState('30');
    const [coordinate, setCoordinate] = useState({latitude: 10.88015919427308, longitude: 106.80892746895552}); 
    const [street, setStreet] = useState('20A Linh Trung');
    const [ward, setWard] = useState(null);
    const [district, setDistrict] = useState(null);
    const [city, setCity] = useState(null);
    const [phoneContact, setPhoneContact] = useState('01224578226');
    const [facilities, dispatchFacilities] = useReducer(facilitiesReducer, facilitiesData.map((el) => ({checked: false, value: el})));

    const [districtsData, setDistrictsData] = useState([]);
    const [wardsData, setWardsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [streetInputFocus, setStreetInputFocus] = useState(false);

    const mapViewRef = useRef(null);

    useEffect(() => {
        if (type === APARTMENT_MODIFICATION_TYPE.UPDATION) {
            if (apartmentDetails.findIndex(el => el.id === id) === -1)
                getApartment({id});
        }
    }, []);

    useEffect(() => {
        if (type === APARTMENT_MODIFICATION_TYPE.UPDATION) {
            if (apartmentDetails.findIndex(el => el.id === id) !== -1) {
                const detail = apartmentDetails.find(el => el.id === id);

                setTitle(detail.title);
                setDescription(detail.description);
                setRent(detail.rent);
                setArea(detail.area);
                setCoordinate({ latitude: detail.address.latitude, longitude: detail.address.longitude });
                setStreet(detail.address.street);
                setCity(detail.address.city);
                dispatchPhotos({
                    type: 'init',
                    payload: detail.photos.map(el => ({uri: serverApi + el}))
                })
                setPhoneContact(detail.phoneContact);
                dispatchFacilities({
                    type: 'init',
                    payload: facilitiesData.map((el) => ({checked: detail.facilities.includes(el), value: el}))
                });
                console.log(detail.photos.map(el => ({uri: serverApi + el})));
                // get districts and wards
                addressRequest
                .get(`district?province=79`)
                .then(response => {
                    var { results } = response.data;
                    setDistrictsData(results);

                    const district = results.find(el => el.name === detail.address.district);
                    setDistrict(district);

                    addressRequest
                        .get(`/commune?district=${district.code}`)
                        .then(response => {
                            var { results } = response.data; 
                            const wards = results.map(el => el.name);
                            setWardsData(wards);
                            //console.log(wards);
                            setWard(detail.address.ward);
                        });
                });
                
                
            }
        }
    }, [apartmentDetails]);

    useEffect(() => {

        let flag = true;
        [street, ward, city].forEach(el => {
            if (el === null)
                flag = false;
        });
        if (!district)
            flag = false;

        if (flag === true && streetInputFocus === false) {
            (async () => {
                try {
                    setLoading(true);
                    let query = street + ', ' + ward + ', ' + district.name + ', ' + city;
                    const firstRes = await bingMapApi.get(`/Locations?key=${bingMapApiKey}&maxResults=1&query=${query}`);
                    if (firstRes.data.resourceSets[0].resources.length !== 0) {
                        const coords = firstRes.data.resourceSets[0].resources[0].point.coordinates; 
                        setCoordinate({ latitude: coords[0], longitude: coords[1] });
                        centerMapCamera({ latitude: coords[0], longitude: coords[1] });
                        return;
                    }
    
                    query = ward + ', ' + district.name + ', ' + city;
                    const secondRes = await bingMapApi.get(`/Locations?key=${bingMapApiKey}&maxResults=1&query=${query}`);
                    if (secondRes.data.resourceSets[0].resources.length !== 0) {
                        const coords = secondRes.data.resourceSets[0].resources[0].point.coordinates; 
                        setCoordinate({ latitude: coords[0], longitude: coords[1] });
                        centerMapCamera({ latitude: coords[0], longitude: coords[1] });
                        return;
                    }
                    
                    query = district.name + ', ' + city;
                    const thirdRes = await bingMapApi.get(`/Locations?key=${bingMapApiKey}&maxResults=1&query=${query}`);
                    if (thirdRes.data.resourceSets[0].resources.length !== 0) {
                        const coords = thirdRes.data.resourceSets[0].resources[0].point.coordinates; 
                        setCoordinate({ latitude: coords[0], longitude: coords[1] });
                        centerMapCamera({ latitude: coords[0], longitude: coords[1] });
                        return;
                    }
    
                    query = city;
                    const fourthRes = await bingMapApi.get(`/Locations?key=${bingMapApiKey}&maxResults=1&query=${query}`);
                    const coords = fourthRes.data.resourceSets[0].resources[0].point.coordinates; 
                    setCoordinate({ latitude: coords[0], longitude: coords[1] });
                    centerMapCamera({ latitude: coords[0], longitude: coords[1] });
                }
                catch (err) {
                    console.log(err);
                    console.log(err.response.data);
                }
                finally {
                    setLoading(false);
                }
            })();
        }

    }, [street, ward, district, city, streetInputFocus]);

    const centerMapCamera = coordinate => mapViewRef.current.animateToRegion({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
    }, 1);

    const submit = () => {
        const apartmentInfos = {
            title,
            description,
            rent,
            area,
            phoneContact,
            facilities: [],
            address: {
                street,
                ward,
                district: district.name,
                city,
                latitude: coordinate.latitude,
                longitude: coordinate.longitude
            },
            photos
        }
        facilities.forEach(el => {
            if (el.checked === true)
                apartmentInfos.facilities.push(el.value);
        });
        
        console.log(apartmentInfos);
        console.log(type);
        if (id !== null) apartmentInfos.id = id;
        if (type === APARTMENT_MODIFICATION_TYPE.CREATION)
            createApartment({apartmentInfos, navigation});
        else if (type === APARTMENT_MODIFICATION_TYPE.UPDATION)
            updateApartment({apartmentInfos, navigation});
    };

    const handleCityChange = city => {
        setCity(city);
        if (city !== null && city !== "") {
            addressRequest
                .get(`district?province=79`)
                .then(response => {
                    console.log(response.data.results);
                    var { results } = response.data;
                    console.log('before');
                    console.log('after');
                    setDistrictsData(results);
                });
        }  
    };

    const handleDistrictChange = districtName => {
        const district = districtsData.find(el => el.name === districtName);
        setDistrict(district);
        if (district !== null && district !== '' || district.name !== '') {
            addressRequest
                .get(`/commune?district=${district.code}`)
                .then(response => {
                    console.log(response.data.results);
                    var { results } = response.data; 
                    const wards = results.map(el => el.name);
                    setWardsData(wards);
                    setWard(wards[0]);
                });
        }
    };

    const selectImage = () => {
        var options = {
            title: 'Chọn hình ảnh',
            storageOptions: {
            skipBackup: true,
            path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, res => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else {
                dispatchPhotos({
                    type: 'add',
                    payload: res
                });
            }
        });
    };

    const drawMarker = (coordinate) => {
        if (isEmpty(coordinate)) {
            return null;
        }
        return (
            <Marker
                coordinate={coordinate}
                pinColor={'#ecb390'}
                title={'Vị trí phòng trọ'}
            />
        );
    };


    const renderFacilities = () => facilities.map((el, index) => {
        return (
            <View style = {styles.checkBox} key={index}>
                <Text style = {styles.textLabel}>{el.value}</Text>
                <View style = {{alignSelf: 'center'}}>
                    <CheckBox value={facilities[index].checked} onValueChange={value => dispatchFacilities({
                        type: value ? 'check' : 'uncheck',
                        payload: {index}
                    })} tintColors={{false: 'rgba(255,255,255,0.8)'}} />
                </View>
            </View>
        )
    });

    const renderPhotoItems = () => {
        return photos.map((el, index) => {
            return (
                <View style={styles.imageWrapper} key={index}>
                    {
                        type === APARTMENT_MODIFICATION_TYPE.CREATION ?
                        <TouchableOpacity onPress={() => dispatchPhotos({type: 'remove', payload: {id: index}})} style={styles.removeImgBtn} >
                            <EntypoIcon name={'circle-with-cross'} size={30} color={'#6E16FE'} />
                        </TouchableOpacity>
                        : null
                    }                   
                    <Image source = {{uri: el.uri}} style={styles.image} resizeMode = 'cover'/>
                </View>
            )});
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {{flex:1}}>
            <ScrollView style = {{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#204051'}}>
                {
                    (loading === true || ui.creatingApartment === true || ui.fetchingApartment || ui.updatingApartment) &&
                    <AnimatedLoader
                        visible={true}
                        overlayColor='rgba(0,0,0,0.5)'
                        source={require('../../assets/2166-dotted-loader.json')}
                        animationStyle={{width: 100, height: 100}}
                        speed={1}
                    />
                }
                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Tiêu đề</Text>
                    <TextInput value={title} onChangeText={txt => setTitle(txt)} style = {styles.textInput}/>
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Thông tin mô tả</Text>
                    <TextInput value={description} onChangeText={txt => setDescription(txt)} style = {styles.textInputMul} textAlignVertical='top' multiline = {true}/>
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Diện tích (㎡)</Text>
                    <TextInput value={rent.toString()} onChangeText={txt => setRent(txt)} style = {styles.textInput} keyboardType = 'number-pad'/>
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Giá thuê (đồng/tháng)</Text>
                    <TextInput value={area.toString()} onChangeText={txt => setArea(txt)} style = {styles.textInput} placeholder = 'Diện tích (m2)' keyboardType = 'number-pad'/>
                </View>
                
                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Tiện nghi có sẵn</Text>
                    {
                       renderFacilities()
                    }
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tỉnh/Thành phố</Text>
                    <View style={{borderBottomWidth: 1, borderColor: '#fff'}}>
                        <Picker style={{color: '#fff'}} selectedValue={city} onValueChange={txt => handleCityChange(txt)} dropdownIconColor={'white'} >
                            {
                                city === null && <Picker.Item label='Chọn tỉnh/thành phố' value='' />
                            }
                            <Picker.Item label='Thành Phố Hồ Chí Minh' value='Hồ Chí Minh' />
                        </Picker>
                    </View>
                </View>
                    

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quận/Huyện</Text>
                    <View style={{borderBottomWidth: 1, borderColor: '#fff'}}>
                        <Picker style={{color: '#fff'}} selectedValue={district?.name} onValueChange={txt => handleDistrictChange(txt)} dropdownIconColor={'white'}>
                            {
                                district === null && <Picker.Item label='Chọn quận/huyện' value='' />
                            }
                            {
                                districtsData.map(el => {
                                    return (
                                        <Picker.Item key={el.name} label={el.name} value={el.name} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Phường/Xã</Text>
                    <View style={{borderBottomWidth: 1, borderColor: '#fff'}}>
                        <Picker style={{color: '#fff'}} selectedValue={ward}  onValueChange={txt => setWard(txt)} dropdownIconColor={'white'}>
                            {
                                ward === null && <Picker.Item label='Chọn phường/xã' value='' />
                            }
                            {
                                wardsData.map(el => {
                                    return (
                                        <Picker.Item key={el} label={el} value={el} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Số nhà, đường</Text>
                    <TextInput value={street} 
                        onBlur={() => {console.log('out'); setStreetInputFocus(false); } } 
                        onFocus={() => {console.log('in'); setStreetInputFocus(true); } } 
                        onChangeText={txt => setStreet(txt)} 
                        style = {{...styles.textInput, paddingLeft: 10}} 
                        />
                </View>

                    
                    
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vị trí trên bản đồ</Text>
                    <MapView
                        ref={mapViewRef}
                        onPress={(e) => setCoordinate(e.nativeEvent.coordinate)}
                        initialRegion={{
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.005,
                        }}
                        style={{height: 400, width: '100%', marginTop: 20}}>
                        {drawMarker(coordinate)}
                    </MapView>
                </View>
                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Số điện thoại liên hệ</Text>
                    <TextInput value={phoneContact} onChangeText={txt => setPhoneContact(txt)} style = {styles.textInput} />
                </View>
               
               <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Hình ảnh thực tế</Text>
                    {
                        renderPhotoItems()
                    }
                    {
                        photos.length > 0 ?
                        null
                        : 
                        <Text style={{alignSelf: 'center', marginTop: 10, marginBottom: 20, color: '#fff'}}>Chọn 4 hình ảnh về phòng trọ của bạn!</Text>
                    }
                    {
                        type === APARTMENT_MODIFICATION_TYPE.UPDATION && photos.length !== 0 ?
                        <TouchableOpacity
                            onPress={ () => dispatchPhotos({ type: 'init', payload: [] }) }
                            style={{paddingVertical: 5, alignSelf: 'center', alignItems: 'center', flexDirection: 'row'}} >
                            <Text style={{ fontWeight: 'bold', color: '#fca652', fontSize: 16}}>Cập nhật hình ảnh mới</Text>
                            <Text style={{ color: '#fca652'}}> cho phòng trọ?</Text>
                        </TouchableOpacity>
                        : null
                    }
                    {
                        photos.length < 4 ?
                        <TouchableOpacity onPress={selectImage} style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
                            <AntDesignIcon name={'pluscircle'} size={40} color={'#6E16FE'} />
                        </TouchableOpacity>
                        :
                        null
                    }
               </View>
               <TouchableOpacity onPress={submit} style={{alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#fff', width: 150, borderRadius: 100, marginBottom: MARGIN_MEDIUM, flexDirection: 'row', alignItems: 'center'}}>
                   <IoniconsIcon name={'checkmark-circle-outline'} size={30} color={'#6E16FE'} />
                   <Text style={{marginLeft: 20}}>Lưu</Text>
               </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user,
        facilitiesData: state.parameters.facilities,
        apartmentDetails: state.apartmentDetails,
        ui: state.ui
    };
};

export default connect(mapStateToProps, {createApartment, updateApartment, getApartment})(CreateOrUpdateApartmentScreen);

const styles = StyleSheet.create({
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        color: '#D9D9D9',
        fontSize: 13,
    },
    textInput: {
      height: 45,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#fff',

      marginBottom: 5,
      marginTop: 5,
      fontSize: 15,
      paddingLeft: 0,
      color: '#fff'
    },
    textInputMul: {
      height: 90,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#fff',

      marginBottom: 5,
      marginTop: 5,
      padding: 10,
      paddingLeft: 0,
      fontSize: 15,
      color: '#fff'
    },
    checkBox: {
      flexDirection: 'row', 
      marginVertical: 5,
      marginHorizontal: 20,  
      alignItems: 'center'
    },
    textLabel: {
      flex: 1,
      fontSize: 12,
      color: '#fff'
    },
    imageWrapper: {
        width: '100%',
        padding: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
      height: 200,
      width: 200
    },
    removeImgBtn: {
        position: 'absolute',
        right: 10,
        top: '50%'
    },
    button: {
      height: 45,
      backgroundColor: '#204051',
      borderRadius: 22.5,
      margin: 10,
      alignContent: 'center',
      justifyContent: 'center',
      shadowOpacity: 0.4,
      shadowOffset: {width: 1, height: 1},
    }
  });