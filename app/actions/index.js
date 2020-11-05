import accommodationRequest from '../apis/serverRequest';
import addressRequest from '../apis/addressRequest';
import {catchAsync, isEmpty} from '../utils';
import ACTION_TYPE from './type';


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

    navigation.navigate('LoginSuccess');
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

    navigation.navigate('Login');

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
        type: ACTION_TYPE.FETCHING_DATA,
        payload: true
    });
    
    const params = {
        limit: 3
    };
    if (query) {
        if (!isEmpty(query.districts)) params.district = query.districts.join(',');
        if (query.page) params.page = query.page;
    }

    accommodationRequest.get('/apartments', {
        params: params
    });

    const response = await accommodationRequest.get('/apartments', {
        params: params
    });
    console.log(response.data.data);
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
        type: ACTION_TYPE.FETCHING_DATA,
        payload: false
    });
}, e => {
    console.log('error');
    console.log(e);
    dispatch({
        type: ACTION_TYPE.FETCHING_DATA,
        payload: false
    });
});


export const getApartment = ({id}) => catchAsync(async dispatch => {
    const response = await accommodationRequest.get(`/apartments/${id}`);
    
    dispatch({
        type: ACTION_TYPE.APARTMENT_GETTING,
        payload: response.data.data
    });
    
}, e => {
    console.log(e);
    console.log('error');
});


/**
 * Get list districts in HCM city 
 */
export const getDistricts = () => catchAsync(async dispatch => {
    console.log('alo?');
    const response = await addressRequest.get('/district?province=79');
    console.log(response.data.results);
    dispatch({
        type: ACTION_TYPE.DISTRICTS_GETTING,
        payload: response.data.results
    });
}, e => {
    console.log(e);
    console.log('error');
});

export const filterApartment = data => dispatch => {
    const districts = [];
    Object.keys(data).forEach(key => data[key].checked && districts.push(data[key].data));
    console.log(districts);
    dispatch({
        type: ACTION_TYPE.FILTER_SETTING,
        payload: {
            type: 'districts',
            data: districts
        }
    });
};


/**
 ** UI animation action
 */
