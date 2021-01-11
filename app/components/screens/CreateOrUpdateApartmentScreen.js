import CheckBox from '@react-native-community/checkbox';
import React, { useState, useReducer, useEffect, useRef, useCallback } from 'react';
import { 
    Image, 
    KeyboardAvoidingView, 
    Platform, 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    TextInput, 
    TouchableOpacity,
    BackHandler,
    ToastAndroid
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { APARTMENT_MODIFICATION_TYPE, isEmpty } from '../../utils';
import { createApartment, getApartment, updateApartment } from '../../actions';
import { MARGIN_MEDIUM } from '../styles/default.value';
import { connect } from 'react-redux';
import addressRequest from '../../apis/addressRequest';
import { bingMapApi, bingMapApiKey } from '../../apis/bingMapApi';
import AnimatedLoader from 'react-native-animated-loader';
import { serverApi } from '../../../appsetting';
import ConfirmPopup from '../defaults/ConfirmPopup';
import { useFocusEffect } from '@react-navigation/native';
import { mustBeANumberRule, mustNotBeEmpty, mustNotBeEmptyStringRule, mustReachNumber, validate } from '../../utils/validation';

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
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rent, setRent] = useState('');
    const [area, setArea] = useState('');
    const [coordinate, setCoordinate] = useState({latitude: 10.88015919427308, longitude: 106.80892746895552}); 
    const [street, setStreet] = useState('');
    const [ward, setWard] = useState(null);
    const [district, setDistrict] = useState(null);
    const [city, setCity] = useState(null);
    const [phoneContact, setPhoneContact] = useState('');
    const [facilities, dispatchFacilities] = useReducer(facilitiesReducer, facilitiesData.map((el) => ({checked: false, value: el})));

    const [districtsData, setDistrictsData] = useState([]);
    const [wardsData, setWardsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [streetInputFocus, setStreetInputFocus] = useState(false);
    const [popupExitVisibility, setPopupExitVisibility] = useState(false);

    // Validation
    const [firstTimeValidation, setFirstTimeValidation] = useState(true);

    const [titleValidated, setTitleValidated] = useState(null);
    const [descriptionValidated, setDescriptionValidated] = useState(null);
    const [rentValidated, setRentValidated] = useState(null);
    const [areaValidated, setAreaValidated] = useState(null);
    const [cityValidated, setCityValidated] = useState(null);
    const [districtValidated, setDistrictValidated] = useState(null);
    const [wardValidated, setWardValidated] = useState(null);
    const [streetValidated, setStreetValidated] = useState(null);
    const [phoneContactValidated, setPhoneContactValidated] = useState(null);
    const [photosValidated, setPhotosValidated] = useState(null);

    const mapViewRef = useRef(null);

    const titleRules = [
        mustNotBeEmptyStringRule('Tiêu đề')
    ];
    const descriptionRules = [
        mustNotBeEmptyStringRule('Mô tả')
    ];
    const rentRules = [
        mustNotBeEmptyStringRule('Giá thuê'),
        mustBeANumberRule('Giá thuê')
    ];
    const areaRules = [
        mustNotBeEmptyStringRule('Diện tích'),
        mustBeANumberRule('Diện tích')
    ];
    const cityRules = [
        mustNotBeEmpty('Tên thành phố/tỉnh')
    ];
    const districtRules = [
        mustNotBeEmpty('Tên quận/huyện')
    ];
    const wardRules = [
        mustNotBeEmpty('Tên phường/xã')
    ];
    const streetRules =[
        mustNotBeEmptyStringRule('Số nhà, đường')
    ];
    const phoneContactRules = [
        mustNotBeEmptyStringRule('Số điện thoại')
    ];
    const photosRules = [
        mustReachNumber('hình ảnh về phòng trọ', 4)
    ];
    
    const validateAll = () => {
        validate(title, titleRules, setTitleValidated);
        validate(description, descriptionRules, setDescriptionValidated);
        validate(rent, rentRules, setRentValidated);
        validate(area, areaRules, setAreaValidated);
        validate(street, streetRules, setStreetValidated);
        validate(ward, wardRules, setDistrictValidated);
        validate(district, districtRules, setWardValidated);
        validate(city, cityRules, setCityValidated);
        validate(phoneContact, phoneContactRules, setPhoneContactValidated);
        validate(photos.length, photosRules, setPhotosValidated);
    };

    const checkAllValidation = () => {
        return  titleValidated === null &&
                descriptionValidated === null &&
                rentValidated === null &&
                areaValidated === null &&
                cityValidated === null &&
                districtValidated === null &&
                wardValidated === null &&
                streetValidated === null &&
                phoneContactValidated === null &&
                photosValidated === null;
    }

    // useEffect(() => {
    //     if (checkAllValidation()(true);
    // }, [titleValidated,
    //     descriptionValidated,
    //     rentValidated,
    //     areaValidated,
    //     cityValidated,
    //     districtValidated,
    //     wardValidated,
    //     streetValidated,
    //     phoneContactValidated,
    //     photosValidated]);

    // useEffect(() => {
    //     console.log(validated);
    // }, [validated]);

    useEffect(() => {
        if (type === APARTMENT_MODIFICATION_TYPE.UPDATION) {
            if (apartmentDetails.findIndex(el => el.id === id) === -1)
                getApartment({id});
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );
    
    const onBackPress = () => {
        console.log('create apartmetn screen');
        setPopupExitVisibility(true);
        return true;
    };
    

    useEffect(() => {
        if (type === APARTMENT_MODIFICATION_TYPE.UPDATION) {
            if (apartmentDetails.findIndex(el => el.id === id) !== -1) {
                const detail = apartmentDetails.find(el => el.id === id);
                console.log(detail);
                setTitle(detail.title);
                setDescription(detail.description);
                setRent(detail.rent.toString());
                setArea(detail.area.toString());
                setCoordinate({ latitude: detail.address.latitude, longitude: detail.address.longitude });
                setStreet(detail.address.street);
                setCity(detail.address.city);
                dispatchPhotos({
                    type: 'init',
                    payload: detail.photos.map(el => ({uri: serverApi + '/' + el}))
                })
                setPhoneContact(detail.phoneContact);
                dispatchFacilities({
                    type: 'init',
                    payload: facilitiesData.map((el) => ({checked: detail.facilities.includes(el), value: el}))
                });
                
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

        console.log(checkAllValidation());
        if (type === APARTMENT_MODIFICATION_TYPE.CREATION && firstTimeValidation === true) {
            setFirstTimeValidation(false);
            ToastAndroid.showWithGravity('Vui lòng nhập đầy đủ thông tin hợp lệ,', ToastAndroid.LONG, ToastAndroid.CENTER);
            return validateAll();
        }
        if (!checkAllValidation())
            return ToastAndroid.showWithGravity('Vui lòng nhập đầy đủ thông tin hợp lệ,', ToastAndroid.LONG, ToastAndroid.CENTER);

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
        
        if (type === APARTMENT_MODIFICATION_TYPE.UPDATION && photos[0].name === undefined) {
            apartmentInfos.photos = [];
        }
        
        console.log(apartmentInfos);
        console.log(type);
        console.log('OK, POSSIBLE TO CONTINUE');

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
                    setWardValidated(null);
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
                validate(photos.length + 1, photosRules, setPhotosValidated);
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
                        <TouchableOpacity 
                            style={styles.removeImgBtn} 
                            onPress={() => { 
                                validate(photos.length - 1, photosRules, setPhotosValidated);
                                dispatchPhotos({type: 'remove', payload: {id: index}});
                            }} 
                            >
                            <EntypoIcon name={'circle-with-cross'} size={30} color={'#6E16FE'} />
                        </TouchableOpacity>
                        : null
                    }                   
                    <Image source = {{uri: el.uri}} style={styles.image} resizeMode = 'cover'/>
                </View>
            )});
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={50} style = {{flex: 1 }}>
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
                <ConfirmPopup
                    text={'Có vẻ như bạn đang nhập thông tin. Bạn có chắc muốn trở lại không?'}
                    visible={popupExitVisibility}
                    setVisible={setPopupExitVisibility}
                    onFinish={ navigation.pop } 
                />
                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Tiêu đề</Text>
                    <TextInput value={title} style = {styles.textInput}
                        onChangeText={ txt => setTitle(txt) }
                        onBlur={ () => validate(title, titleRules, setTitleValidated) }
                        />
                    {
                        titleValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12 }}>{titleValidated}</Text> :
                        null
                    }
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Thông tin mô tả</Text>
                    <TextInput value={description} style = {styles.textInputMul} textAlignVertical='top' multiline = {true}
                        onChangeText={txt => setDescription(txt)}
                        onBlur={ () => validate(description, descriptionRules, setDescriptionValidated) }
                        />
                    {
                        descriptionValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12 }}>{descriptionValidated}</Text> :
                        null
                    }
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Giá thuê (đồng/tháng)</Text>
                    <TextInput value={rent.toString()} style = {styles.textInput} keyboardType = 'number-pad'
                        onChangeText={txt => setRent(txt)}
                        onBlur={ () => validate(rent, rentRules, setRentValidated) }
                        />
                    {
                        rentValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12 }}>{rentValidated}</Text> :
                        null
                    }
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Diện tích (㎡)</Text>
                    <TextInput value={area.toString()} style = {styles.textInput} keyboardType = 'number-pad'
                        onChangeText={txt => setArea(txt)}
                        onBlur={ () => validate(area, areaRules, setAreaValidated) }
                        />
                    {
                        areaValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12 }}>{areaValidated}</Text> :
                        null
                    }
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
                        <Picker style={{color: '#fff'}}
                            dropdownIconColor={'white'} 
                            selectedValue={city}  
                            onValueChange={txt => {
                                handleCityChange(txt);
                                validate(txt, cityRules, setCityValidated);
                            }} >
                            {
                                city === null && <Picker.Item label='Chọn tỉnh/thành phố' value={null} />
                            }
                            <Picker.Item label='Thành Phố Hồ Chí Minh' value='Hồ Chí Minh' />
                        </Picker>
                    </View>
                    {
                        cityValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{cityValidated}</Text> :
                        null
                    }
                </View>
                    

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quận/Huyện</Text>
                    <View style={{borderBottomWidth: 1, borderColor: '#fff'}}>
                        <Picker style={{color: '#fff'}} 
                            dropdownIconColor={'white'}
                            selectedValue={district?.name} 
                            onValueChange={value => { 
                                handleDistrictChange(value);
                                validate(value, districtRules, setDistrictValidated);
                            }}
                            >
                            {
                                district === null && <Picker.Item label='Chọn quận/huyện' value={null} />
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
                    {
                        districtValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{districtValidated}</Text> :
                        null
                    }
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Phường/Xã</Text>
                    <View style={{borderBottomWidth: 1, borderColor: '#fff'}}>
                        <Picker style={{color: '#fff'}} 
                            dropdownIconColor={'white'}
                            selectedValue={ward}  
                            onValueChange={txt => {
                                setWard(txt);
                                validate(txt, wardRules, setWardValidated);
                            }} 
                            >
                            {
                                ward === null && <Picker.Item label='Chọn phường/xã' value={null} />
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
                    {
                        wardValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{wardValidated}</Text> :
                        null
                    }
                </View>

                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Số nhà, đường</Text>
                    <TextInput value={street} 
                        style = {{...styles.textInput, paddingLeft: 10}} 
                        onChangeText={txt => setStreet(txt)} 
                        onFocus={() => {console.log('in'); setStreetInputFocus(true); } }
                        onBlur={() => {
                            setStreetInputFocus(false); 
                            validate(street, streetRules, setStreetValidated);
                        }}  
                        />
                    {
                        streetValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{streetValidated}</Text> :
                        null
                    }
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
                    <TextInput value={phoneContact} style = {styles.textInput}
                        onChangeText={txt => setPhoneContact(txt)}
                        onBlur={ () => validate(phoneContact, phoneContactRules, setPhoneContactValidated) }
                        />
                    {
                        phoneContactValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12 }}>{phoneContactValidated}</Text> :
                        null
                    }
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
                        photosValidated !== null ?
                        <Text style={{ color: 'red', fontSize: 12, alignSelf: 'center', marginVertical: 10 }}>{photosValidated}</Text> :
                        null
                    }
                    {
                        photos.length < 4 ?
                        <TouchableOpacity onPress={selectImage} style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
                            <AntDesignIcon name={'pluscircle'} size={40} color={'#fff'} />
                        </TouchableOpacity>
                        :
                        null
                    }
               </View>
               <TouchableOpacity onPress={submit} style={styles.saveBtn}>
                   <IoniconsIcon name={'checkmark-circle-outline'} size={30} color={'#fff'} />
                   <Text style={{marginLeft: 20, color: '#fff'}}>Lưu</Text>
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
    },
    saveBtn: {
        alignSelf: 'center', 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        backgroundColor: '#06BBD8',
        width: 150, 
        borderRadius: 100, 
        marginBottom: MARGIN_MEDIUM, 
        flexDirection: 'row', 
        alignItems: 'center'
    }
  });