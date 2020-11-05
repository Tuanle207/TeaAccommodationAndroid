import ACTION_TYPE from '../actions/type';

const INIT = [];

const apartmentDetail = (state = INIT, action) => {
    switch (action.type) {
        case ACTION_TYPE.APARTMENT_GETTING:
            return action.payload;
        case ACTION_TYPE.APARTMENTS_GETTING_NEXT_PAGE:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default apartmentDetail;