import ACTION_TYPE from '../actions/type';

const INIT = {
    fetchingApartments: false,
    fetchingApartment: false,
    openingApp: true
};

const ui = (state = INIT, action) => {
    switch (action.type) {
        case ACTION_TYPE.FETCHING_APARTMENTS:
            return {...state, fetchingApartments: action.payload};
        case ACTION_TYPE.FETCHING_APARTMENT:
            return {...state, fetchingApartment: action.payload};
        default:
            return state;
    }
}

export default ui;