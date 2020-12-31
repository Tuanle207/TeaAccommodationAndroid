import ACTION_TYPE from '../actions/type';

const INIT = {
    auth: false,
    data: null
}
const userReducer = (state = INIT, action) => {
    switch (action.type) {
        case ACTION_TYPE.USER_LOGIN:
        case ACTION_TYPE.USER_LOGOUT:
            return action.payload;
        case ACTION_TYPE.USER_LOGGED_IN:
            return {...state, ...action.payload};
        case ACTION_TYPE.UPDATE_USER_INFORMATION:
            return {...state, ...action.payload};
        case ACTION_TYPE.SIGNUP_USER:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default userReducer;