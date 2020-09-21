import ACTION_TYPE from '../actions/type';

const INIT = {
    fetchingData: false,
    openingApp: true
};

const ui = (state = INIT, action) => {
    switch (action.type) {
        case ACTION_TYPE.FETCHING_DATA:
            return {...state, fetchingData: action.payload};
        default:
            return state;
    }
}

export default ui;