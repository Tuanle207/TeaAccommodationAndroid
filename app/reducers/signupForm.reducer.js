import ACTION_TYPE from "../actions/type"

const INIT_STATE = {
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phoneNumber: '',
    photo: {},
    role: ''
};

const signupFormReducer = (state = INIT_STATE, action) => {
    switch(action.type){
        case ACTION_TYPE.SIGNUP_USER:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default signupFormReducer;