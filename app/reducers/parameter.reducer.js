import ACTION_TYPE from '../actions/type';

const INIT = {
    districts: [],
    wards: [],
    streets: []
};

const parameterReducer = (state = INIT, action) => {
    switch(action.type) {
        case ACTION_TYPE.DISTRICTS_GETTING:
            return {...state, districts: action.payload};
        case ACTION_TYPE.WARDS_GETTING:
            return {...state, wards: action.payload};
        case ACTION_TYPE.STREETS_GETTING:
            return {...state, streets: action.payload};
        default:
            return state;
    }
};

export default parameterReducer;