import ACTION_TYPE from '../actions/type';

const INIT = {
    meta: {},
    data: []
};

const myApartments = (state = INIT, action) => {
    
    switch (action.type) {
        case ACTION_TYPE.MY_APARTMENTS_GETTING:
            return action.payload;
        case ACTION_TYPE.MY_APARTMENTS_GETTING_NEXT_PAGE:
            return {
                meta: action.payload.meta, 
                data: [...state.data, ...action.payload.data]
            };
        default:
            return state;
    } 
};

export default myApartments;