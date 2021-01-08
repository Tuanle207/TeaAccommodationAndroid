import ACTION_TYPE from '../actions/type';

const INIT = {
    fetchingApartments: false,
    fetchingApartment: false,
    creatingComment: false,
    creatingApartment: false,
    updatingApartment: false,
    openingApp: true
};

const ui = (state = INIT, action) => {
    switch (action.type) {
        case ACTION_TYPE.FETCHING_APARTMENTS:
            return {...state, fetchingApartments: action.payload};
        case ACTION_TYPE.FETCHING_APARTMENT:
            return {...state, fetchingApartment: action.payload};
        case ACTION_TYPE.COMMENT_CREATING:
            return {...state, creatingComment: action.payload};
        case ACTION_TYPE.CREATING_APARTMENT:
            return {...state, creatingApartment: action.payload};
        case ACTION_TYPE.UPDATING_APARTMENT:
            return {...state, updatingApartment: action.payload};
        default:
            return state;
    }
}

export default ui;