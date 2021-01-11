import ACTION_TYPE from '../actions/type';

const INIT = {
    districts: [],
    cities: [],
    facilities: []
};

const parameterReducer = (state = INIT, action) => {
    switch(action.type) {
        case ACTION_TYPE.DISTRICTS_GETTING:
            return {...state, districts: action.payload};
        case ACTION_TYPE.PARAMS_GETTING:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default parameterReducer;