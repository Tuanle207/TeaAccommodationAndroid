import ACTION_TYPE from '../actions/type';

const INIT = {
    fetchingApartments: false,
    fetchingApartment: false,
    creatingComment: false,
    creatingApartment: false,
    updatingApartment: false,
    reloadMyApartment: false,
    checkingLogin: false,
    changingApartmentStatus: false,
    deletingApartment: false,
    openedApp: true
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
        case ACTION_TYPE.MY_APARTMENTS_RELOADING:
            return {...state, reloadMyApartment: action.payload};
        case ACTION_TYPE.CHECKING_LOGIN:
            return {...state, checkingLogin: action.payload};
        case ACTION_TYPE.CHANGING_APARTMENT_STATUS:
            return {...state, changingApartmentStatus: action.payload};
        case ACTION_TYPE.DELETING_APARTMENT:
            return {...state, deletingApartment: action.payload};
        case ACTION_TYPE.OPENED_APP:
            return {...state, openedApp: action.payload};
        default:
            return state;
    }
}

export default ui;