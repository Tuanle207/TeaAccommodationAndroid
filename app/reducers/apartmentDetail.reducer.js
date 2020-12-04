import ACTION_TYPE from '../actions/type';

const INIT = [];

const apartmentDetail = (state = INIT, action) => {
    let newState = [];
    switch (action.type) {
        case ACTION_TYPE.APARTMENT_GETTING:
            newState = [...state];

            const indexOld = newState.findIndex(el => el.id = action.payload.id)
            if (indexOld != -1)
                newState.splice(indexOld, 1, action.payload);
            else
                newState.push(action.payload);
                
            return newState;
        case ACTION_TYPE.APARTMENTS_GETTING_NEXT_PAGE:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default apartmentDetail;