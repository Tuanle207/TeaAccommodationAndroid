import accommodationRequest from '../apis/serverRequest';
import addressRequest from '../apis/addressRequest';
import {catchAsync, isEmpty} from '../utils';
import ACTION_TYPE from './type';
import { serverApi } from '../../appsetting';


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
    navigation.navigate('Login');
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

    navigation.navigate('Đăng nhập thành công');
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

    navigation.navigate('Đăng nhập');

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
    
    let queryString = `?limit=${3}`;

    if (query) {
        if (query.page) queryString += `&page=${query.page}`;
        if (query.districts.length > 0) queryString += `&district=${query.districts.join(',')}`;
        if (query.coordinate.length > 0) queryString += `&latitude=${query.coordinate[0]}&longitude=${query.coordinate[1]}`;
        if (!isEmpty(query.rent)) queryString += `&rent[gte]=${query.rent.min}&rent[lte]=${query.rent.max}`;
        if (!isEmpty(query.area)) queryString += `&area[gte]=${query.area.min}&area[lte]=${query.area.max}`;
    }
    console.log(queryString);
    

    const response = await accommodationRequest.get('/apartments' + queryString);
    //console.log(response.data.meta);
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
}, e => {
    console.log('error');
    console.log(e);
    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENTS,
        payload: false
    });
});


export const getApartment = ({id}) => catchAsync(async dispatch => {

    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENT,
        payload: true
    });

    const response = await accommodationRequest.get(`/apartments/${id}`);
    
    dispatch({
        type: ACTION_TYPE.APARTMENT_GETTING,
        payload: response.data.data
    });

    dispatch({
        type: ACTION_TYPE.FETCHING_APARTMENT,
        payload: false
    });
    
}, e => {
    console.log(e);
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
            dataForDispatch = data.data;
            break;
        case 'facilities':
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

export const createApartment = data => catchAsync(async dispatch => {
    console.log('uploading infomartion?');

    const formDataBody = new FormData();
    formDataBody.append('title', data.title);
    formDataBody.append('description', data.description);
    formDataBody.append('rent', data.rent);
    formDataBody.append('area', data.area);
    formDataBody.append('phoneContact', data.phoneContact);
    formDataBody.append('facilities', JSON.stringify(data.facilities));
    formDataBody.append('address', JSON.stringify(data.address));
    data.photos.forEach((photo, index) => {
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
    
}, e => {
    console.log(e.response.data);
    console.log('error');
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
