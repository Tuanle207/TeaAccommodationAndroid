import accommodationRequest from '../apis/serverRequest';
import addressRequest from '../apis/addressRequest';
import {catchAsync, isEmpty} from '../utils';
import ACTION_TYPE from './type';
import { ScreenNames } from '../components/Navigation/NavigationConst';
import { ToastAndroid } from 'react-native';


export const doSomething = data => dispatch => {
    console.log('You are doing something...Maybe it involves changing state?');

    if (!data) {
        data = {
            data: 'data has been changed',
            error: 'no error'
        };
    }
    console.log('Action: ' + data.email);
    dispatch({
        type: ACTION_TYPE.DO_SOMETHING,
        payload: data
    });
};


export const updateLoginInfo = data => {
    return (dispatch) => {
        dispatch({
            type: ACTION_TYPE.UPDATE_LOGIN_INFO,
            payload: data
        });
    };
};

export const checkLoggedIn = ({navigation}) => catchAsync(async dispatch => {

    dispatch({
        type: ACTION_TYPE.FETCHING_DATA,
        payload: true
    });

    const response = await accommodationRequest.get('/isLoggedIn');
    const data = response.data.data;
  
    dispatch({
        type: ACTION_TYPE.USER_LOGGED_IN,
        payload: {
            auth: true,
            data
        }
    });
    dispatch({
        type: ACTION_TYPE.FETCHING_DATA,
        payload: false
    });
}, (e) => {
    console.log(e);
    navigation.navigate(ScreenNames.LOGIN);
});

export const login = ({email, password, navigation}) => catchAsync(async dispatch => {
    if (!email || !password)
        return false;

    console.log('getting');
    const response = await accommodationRequest.post('/login', {
        email, password
    });

    console.log('success');
    dispatch({
        type: ACTION_TYPE.USER_LOGIN,
        payload: {
            auth: true,
            data: response.data.data,
            token: response.data.token}
    });

    navigation.navigate(ScreenNames.LOGIN_SUCCESS);
}, (e) => {
    console.log('error!');
    console.log(e);
});

export const logout = ({navigation}) => catchAsync(async dispatch => {

    await accommodationRequest.get('/logout');

    dispatch({
        type: ACTION_TYPE.USER_LOGIN,
        payload: {
            auth: false,
            data: null
        }
    });

    navigation.navigate(ScreenNames.LOGIN);

}, (e) => {
    console.log('error!');
    console.log(e);
});

/**
 * Get list of apartments via api requesting
 * @param {*} query query string for requesting api 
 */
export const getApartments = query => catchAsync(async dispatch => {
    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENTS,
        payload: true
    });
    
    let queryString = `?limit=${10}`;

    if (query) {
        if (query.page)                     queryString += `&page=${query.page}`;
        if (query.districts.length > 0)     queryString += `&district=${query.districts.join(',')}`;
        if (query.coordinate.length > 0)    queryString += `&latitude=${query.coordinate[0]}&longitude=${query.coordinate[1]}`;
        if (!isEmpty(query.rent))           queryString += `&rent[gte]=${query.rent.min}&rent[lte]=${query.rent.max}`;
        if (!isEmpty(query.area))           queryString += `&area[gte]=${query.area.min}&area[lte]=${query.area.max}`;
        if (query.facilities.length > 0)    queryString += `&facilities=${query.facilities.join(',')}`;
    }

    const response = await accommodationRequest.get('/apartments' + queryString);

    if (query?.page)
        dispatch({
            type: ACTION_TYPE.APARTMENTS_GETTING_NEXT_PAGE,
            payload: {
                meta: response.data.meta,
                data: response.data.data
            }
        });
    else
        dispatch({
            type: ACTION_TYPE.APARTMENTS_GETTING,
            payload: {
                meta: response.data.meta,
                data: response.data.data
            }
        });
        
    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENTS,
        payload: false
    });
}, (err, dispatch) => {
    if (err.message = 'Network Error') {
        console.log('loi mang!!!!!!!!!!!!!!1');
        dispatch({
            type: ACTION_TYPE.ERROR_OCCURRING,
            payload: "Lỗi kết nối mạng"
        })
    }
    
    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENTS,
        payload: false
    });
});


export const getMyApartments = query => catchAsync(async (dispatch, getState) => {

    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENTS,
        payload: true
    });

    let queryString = `?limit=${10}`;
    if (query?.page) queryString += `&page=${query.page}`;
    
    const response = await accommodationRequest.get('/apartments/posted' + queryString);

    if (query?.page)
        dispatch({
            type: ACTION_TYPE.MY_APARTMENTS_GETTING_NEXT_PAGE,
            payload: {
                meta: response.data.meta,
                data: response.data.data
            }
        });
    else
        dispatch({
            type: ACTION_TYPE.MY_APARTMENTS_GETTING,
            payload: {
                meta: response.data.meta,
                data: response.data.data
            }
        });
    if (getState().ui.reloadMyApartment === true)
        dispatch({
            type: ACTION_TYPE.MY_APARTMENTS_RELOADING,
            payload: false
        });
    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENTS,
        payload: false
    });
}, (err, dispatch) => {
    
    console.log(err);
    dispatch({
        type: ACTION_TYPE.MY_APARTMENTS_RELOADING,
        payload: false
    });
    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENTS,
        payload: false
    });
});

export const getApartment = ({id}) => catchAsync(async (dispatch, getState) => {

    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENT,
        payload: true
    });

    const apartmentResponse = await accommodationRequest.get(`/apartments/${id}`);
    const apartment = apartmentResponse.data.data;
    const commentsResponse = await accommodationRequest.get(`/apartments/${id}/comments`);
    const { user } = getState();
    console.log(getState());
    if (user.auth === true) {
        console.log('get user rating');
        const userRatingResponse = await accommodationRequest.get(`/apartments/${id}/ratings`);
        const res = userRatingResponse.data.data;
        apartment.userRating = res !== null ? res.rating : -1;
    }
    console.log(commentsResponse.data);
    dispatch({
        type: ACTION_TYPE.APARTMENT_GETTING,
        payload: apartmentResponse.data.data
    });
    dispatch({
        type: ACTION_TYPE.COMMENTS_GETTING,
        payload: {
            apartmentId: id,
            comments: commentsResponse.data.data
        }
    });

    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENT,
        payload: false
    });
    
}, (err, dispatch) => {
    console.log(err);
    console.log('error');
    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENT,
        payload: false
    });
});



/**
 * Get list districts in HCM city 
 */
export const getDistricts = () => catchAsync(async dispatch => {

    const response = await addressRequest.get('/district?province=79');
    //console.log(response.data.results);
    dispatch({
        type: ACTION_TYPE.DISTRICTS_GETTING,
        payload: response.data.results
    });
}, e => {
    console.log(e);
    console.log('error');
});

export const filterApartment = data => dispatch => {
    const { type } = data;
    let dataForDispatch = null;
    switch (type) {
        case 'districts':
            const districts = [];
            Object.keys(data.data).forEach(key => data.data[key].checked && districts.push(data.data[key].data));
            dataForDispatch = districts;
            break;
        case 'coordinate':
        case 'address':
        case 'rent':
        case 'area':
        case 'facilities':
            dataForDispatch = data.data;
            break;
        default:
            return;
    }
    console.log(dataForDispatch);
    dispatch({
        type: ACTION_TYPE.FILTER_SETTING,
        payload: {
            type: type,
            data: dataForDispatch
        }
    });
};

export const createApartment = ({apartmentInfos, navigation}) => catchAsync(async dispatch => {
    console.log('uploading infomartion?');
    dispatch({
        type: ACTION_TYPE.CREATING_APARTMENT,
        payload: true
    });
    const formDataBody = new FormData();
    formDataBody.append('title', apartmentInfos.title);
    formDataBody.append('description', apartmentInfos.description);
    formDataBody.append('rent', apartmentInfos.rent);
    formDataBody.append('area', apartmentInfos.area);
    formDataBody.append('phoneContact', apartmentInfos.phoneContact);
    formDataBody.append('facilities', JSON.stringify(apartmentInfos.facilities));
    formDataBody.append('address', JSON.stringify(apartmentInfos.address));
    apartmentInfos.photos.forEach((photo, index) => {
        formDataBody.append(`photo_${index + 1}`, {
            name: photo.fileName,
            type: photo.type,
            uri: photo.uri
        });
    });

    console.log(formDataBody);

    const response = await accommodationRequest.post('/apartments', formDataBody, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(response.data.data);
    dispatch({
        type: ACTION_TYPE.CREATING_APARTMENT,
        payload: false
    });
    ToastAndroid.showWithGravity('Đăng phòng trọ mới thành công!', ToastAndroid.LONG, ToastAndroid.CENTER);

    navigation.goBack();
    dispatch({
        type: ACTION_TYPE.MY_APARTMENTS_RELOADING,
        payload: true
    });
    
}, (err, dispatch) => {
    console.log(err.response.data);
    console.log('error');
    ToastAndroid.show('Đã có lỗi xảy ra', ToastAndroid.SHORT);
    dispatch({
        type: ACTION_TYPE.CREATING_APARTMENT,
        payload: true
    });
});

export const updateApartment = ({apartmentInfos, navigation}) => catchAsync(async dispatch => {
    console.log('uploading infomartion?');
    dispatch({
        type: ACTION_TYPE.UPDATING_APARTMENT,
        payload: true
    });
    const formDataBody = new FormData();
    formDataBody.append('title', apartmentInfos.title);
    formDataBody.append('description', apartmentInfos.description);
    formDataBody.append('rent', apartmentInfos.rent);
    formDataBody.append('area', apartmentInfos.area);
    formDataBody.append('phoneContact', apartmentInfos.phoneContact);
    formDataBody.append('facilities', JSON.stringify(apartmentInfos.facilities));
    formDataBody.append('address', JSON.stringify(apartmentInfos.address));
    console.log(apartmentInfos.photos);
    
    if (apartmentInfos.photos.length > 0) {
        console.log('alo');
        apartmentInfos.photos.forEach((photo, index) => {
            formDataBody.append(`photo_${index + 1}`, {
                name: photo.fileName,
                type: photo.type,
                uri: photo.uri
            });
        });
    }
    

    console.log(formDataBody);

    const response = await accommodationRequest.post(`/apartments/${apartmentInfos.id}`, formDataBody, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(response.data.data);
    dispatch({
        type: ACTION_TYPE.APARTMENTS_GETTING,
        payload: response.data.data
    })
    dispatch({
        type: ACTION_TYPE.UPDATING_APARTMENT,
        payload: false
    });
    ToastAndroid.showWithGravity('Cập nhật thông tin phòng trọ thành công!', ToastAndroid.LONG, ToastAndroid.CENTER);

    navigation.goBack();
        dispatch({
        type: ACTION_TYPE.MY_APARTMENTS_RELOADING,
        payload: true
    });
}, (err, dispatch) => {
    console.log(err.response.data);
    console.log('error');
    ToastAndroid.show('Đã có lỗi xảy ra', ToastAndroid.SHORT);
    dispatch({
        type: ACTION_TYPE.UPDATING_APARTMENT,
        payload: true
    });
});

export const createComment = data => catchAsync(async dispatch => {
    dispatch({
        type: ACTION_TYPE.CREATING_COMMENT,
        payload: true
    });

    const { apartmentId, text } = data;
    const response = await accommodationRequest.post(`/apartments/${apartmentId}/comments`, { text });
    const comment = response.data.data;
    const now = new Date();
    dispatch({
        type: ACTION_TYPE.COMMENT_CREATING,
        payload: {
            id: comment.id,
            text: comment.text,
            commentedAt: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
            user: comment.commentedBy,
            apartmentId: comment.idApartment
        }
    })

    dispatch({
        type: ACTION_TYPE.CREATING_COMMENT,
        payload: false
    });
    ToastAndroid.showWithGravity('Thêm bình luận thành công!', ToastAndroid.SHORT, ToastAndroid.CENTER);
}, (err, dispatch) => {
    ToastAndroid.showWithGravity('Đã có lỗi xảy ra', ToastAndroid.SHORT, ToastAndroid.CENTER);
    console.log(err);
    dispatch({
        type: ACTION_TYPE.CREATING_COMMENT,
        payload: false
    });
});

export const getParams = () => catchAsync(async dispatch => {
    const response = await accommodationRequest.get('/params');
    const { data } = response.data;
    dispatch({
        type: ACTION_TYPE.PARAMS_GETTING,
        payload: data
    });
}, e => {
    console.log(e);
    console.log('error');
});

/**
 ** UI animation action
 */
