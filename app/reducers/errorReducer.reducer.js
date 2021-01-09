import ACTION_TYPE from '../actions/type';

const INIT = {
    hasError: false,
    messages: []
};

const errorReducer = (state = INIT, action) => {
    let newState = {...state};
    switch (action.type) {
        case ACTION_TYPE.ERROR_OCCURRING:
            newState.messages.push(action.payload);
            newState.hasError = true;
            return newState;
        default:
            return state;
    } 
};

export default errorReducer;