import ACTION_TYPE from "../actions/type";

const INIT_STATE = {
    data: 'this is default data',
    error: 'this is default error'
};

const testReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPE.DO_SOMETHING:
            console.log('State have been updating');
            return action.payload;
        default:
            return state;
    }
};

export default testReducer;