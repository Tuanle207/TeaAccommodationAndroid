
import ACTION_TYPE from "../actions/type";

const INIT_STATE = {
    email: 'letgo237@gmail.com',
    password: 'test1234'
};

const loginFormReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPE.UPDATE_LOGIN_INFO:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default loginFormReducer;
