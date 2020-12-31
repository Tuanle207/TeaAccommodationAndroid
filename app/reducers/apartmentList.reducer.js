import ACTION_TYPE from '../actions/type';

const INIT = {
    meta: {},
    data: []
};

const apartmentListReducer = (state = INIT, action) => {
    
    switch (action.type) {
        case ACTION_TYPE.APARTMENTS_GETTING:
            console.log(action);
            return action.payload;
        case ACTION_TYPE.APARTMENTS_GETTING_NEXT_PAGE:
            console.log(action);
            
            return {
                meta: action.payload.meta, 
                data: [...state.data, ...action.payload.data]
            };
        default:
            return state;
    } 
};

export default apartmentListReducer;