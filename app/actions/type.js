const ACTION_TYPE = {
    // API REQUESTING
    APP_STARTING: 'APP_STARTING',
    DO_SOMETHING: 'DO_SOMETHING',
    UPDATE_LOGIN_INFO: 'UPDATE_LOGIN_INFO',
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
    USER_LOGGED_IN: 'USER_LOGGED_IN',
    APARTMENTS_GETTING: 'APARTMENTS_GETTING',
    APARTMENTS_GETTING_NEXT_PAGE: 'APARTMENTS_GETTING_NEXT_PAGE',
    APARTMENT_GETTING: 'APARTMENT_GETTING', 
    COMMENTS_GETTING: 'COMMENTS_GETTING',
    DISTRICTS_GETTING: 'DISTRICTS_GETTING',
    WARDS_GETTING: 'WARDS_GETTING',
    STREETS_GETTING: 'STREETS_GETTING',
    FILTER_SETTING: 'FILTER_SETTING',
    FILTER_RESETTING: 'FILTER_RESETTING',
    PARAMS_GETTING: 'PARAMS_GETTING',


    // UI ANIMATION,
    FETCHING_APARTMENTS: 'FETCHING_APARTMENTS',
    FETCHING_APARTMENT: 'FETCHING_APARTMENT'
};

export default ACTION_TYPE;