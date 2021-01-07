import CheckBox from '@react-native-community/checkbox';
import React, { useState, useReducer } from 'react';
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
import { isEmpty } from '../../utils';
import { createApartment } from '../../actions';
import { MARGIN_MEDIUM } from '../styles/default.value';
import { connect } from 'react-redux';
import addressRequest from '../../apis/addressRequest';


const facilitiesData = ['wifi', 'máy giặt', 'tủ lạnh']

const photosReducer = (state, action) => {
    
    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        case 'remove':
            const newState = [...state];
            newState.splice(action.payload.id, 1);
            return newState;
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
        default:
            return state;
    }
};


const CreateOrUpdateApartmentScreen = ({ createApartment }) => {
    
    const [photos, dispatchPhotos] = useReducer(photosReducer, []);
    const [title, setTitle] = useState('Phòng trọ xịn xò');
    const [description, setDescription] = useState('Phòng xò xịn nhất Việt Name');
    const [rent, setRent] = useState('2500000');
    const [area, setArea] = useState('30');
    const [coordinate, setCoordinate] = useState({latitude: 10.88015919427308, longitude: 106.80892746895552}); 
    const [street, setStreet] = useState('14 Linh Trung');
    const [ward, setWard] = useState(null);
    const [district, setDistrict] = useState(null);
    const [city, setCity] = useState(null);
    const [phoneContact, setPhoneContact] = useState('01224578226');
    const [facilities, dispatchFacilities] = useReducer(facilitiesReducer, facilitiesData.map((el) => ({checked: false, value: el})));

    const [districtsData, setDistrictsData] = useState([]);
    const [wardsData, setWardsData] = useState([]);
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
                district,
                city,
                latitude: coordinate.latitude,
                longitude: coordinate.longitude
            },
            photos
        }
        facilities.forEach(el => {
            if (el.checked === true)
                apartmentInfos.facilities.push(el.value);
        })
        //if (id !== null) apartmentInfos.id = id;
        createApartment(apartmentInfos);
    };

    const handleCityChange = city => {
        setCity(city);
        if (city !== null && city !== "") {
            addressRequest
                .get('/district?province=79')
                .then(response => {
                    console.log(response.data.results);
                    var { results } = response.data; 
                    const districts = results.map(el => el.name);
                    setDistrictsData(districts);
                });
        }
            
    };

    const handleWardChange = ward => {
        setWard(ward);
        if (ward !== null && ward !== "") {
            addressRequest
                .get(`/commune?district=${ward}`)
                .then(response => {
                    console.log(response.data.results);
                    var { results } = response.data; 
                    const wards = results.map(el => el.name);
                    setWardsData(wards);
                });
        }
    }

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
                pinColor={'#61b15a'}
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
                    })} onTintColor = '#006a71' onCheckColor = '#006a71'/>
                </View>
            </View>
        )
    });

    const renderItemPhoto = () => {
        return photos.map((el, index) => {
            return (
                <View style={styles.imageWrapper} key={index}>
                    <TouchableOpacity onPress={() => dispatchPhotos({type: 'remove', payload: {id: index}})} style={styles.removeImgBtn} >
                        <EntypoIcon name={'circle-with-cross'} size={30} color={'#6E16FE'} />
                    </TouchableOpacity>
                    <Image source = {{uri: el.uri}} style={styles.image} resizeMode = 'cover'/>
                </View>
            )});
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset = {65} style = {{flex:1}}>
            <ScrollView style = {{paddingVertical: 10, paddingHorizontal: 20}}>
                
                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Thông tin cơ bản</Text>
                    <TextInput value={title} onChangeText={txt => setTitle(txt)} style = {styles.textInput} placeholder = 'Tiêu đề/tên trọ'/>
                    <TextInput value={rent} onChangeText={txt => setRent(txt)} style = {styles.textInput} placeholder = 'Giá thuê (triệu đồng/tháng)' keyboardType = 'number-pad'/>
                    <TextInput value={area} onChangeText={txt => setArea(txt)} style = {styles.textInput} placeholder = 'Diện tích (m2)' keyboardType = 'number-pad'/>
                </View>
                
                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Tiện nghi có sẵn</Text>
                    {
                       renderFacilities()
                    }
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Địa chỉ</Text>
                    <View style={{borderBottomWidth: 1, borderColor: '#000'}}>
                        <Picker selectedValue={city} onValueChange={txt => handleCityChange(txt)}>
                            {
                                city === null && <Picker.Item label='Chọn tỉnh/thành phố' value='' />
                            }
                            <Picker.Item label='Thành phố Hồ Chí Minh' value='Hồ Chí Minh' />
                        </Picker>
                    </View>
                    <View style={{borderBottomWidth: 1, borderColor: '#000'}}>
                        <Picker selectedValue={district} onValueChange={txt => setDistrict(txt)}>
                            {
                                district === null && <Picker.Item label='Chọn quận/huyện' value='' />
                            }
                            {
                                districtsData.map(el => {
                                    return (
                                        <Picker.Item key={el} label={el} value={el} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{borderBottomWidth: 1, borderColor: '#000'}}>
                        <Picker selectedValue={ward}  onValueChange={txt => setWard(txt)}>
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
                    <TextInput value={street} onChangeText={txt => setStreet(txt)} style = {{...styles.textInput, paddingLeft: 10}} placeholder = 'Số nhà, đường'/>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vị trí trên bản đồ</Text>
                    <MapView
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
                    <Text style = {styles.sectionTitle}>Liên hệ</Text>
                    <TextInput value={phoneContact} onChangeText={txt => setPhoneContact(txt)} style = {styles.textInput} placeholder = 'Số điện thoại'/>
                </View>
                
                <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Thông tin mô tả</Text>
                    <TextInput value={description} onChangeText={txt => setDescription(txt)} style = {styles.textInputMul} placeholder = 'Mô tả' textAlignVertical='top' multiline = {true}/>
                </View>
               
               <View style={styles.section}>
                    <Text style = {styles.sectionTitle}>Hình ảnh thực tế</Text>
                    {
                        renderItemPhoto()
                    }
                    {
                        photos.length > 0 ?
                        null
                        : 
                        <Text style={{alignSelf: 'center', marginTop: 10, marginBottom: 20}}>Chọn 4 hình ảnh về phòng trọ của bạn!</Text>
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

export default connect(null, {createApartment})(CreateOrUpdateApartmentScreen);

const styles = StyleSheet.create({
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textInput: {
      height: 45,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 1,

      marginBottom: 5,
      marginTop: 5,
      fontSize: 15,
      paddingLeft: 0
    },
    textInputMul: {
      height: 90,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 1,

      marginBottom: 5,
      marginTop: 5,
      padding: 10,
      fontSize: 15,
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