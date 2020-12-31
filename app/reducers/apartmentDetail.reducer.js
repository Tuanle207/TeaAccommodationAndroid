import ACTION_TYPE from '../actions/type';

const INIT = [];

const apartmentDetail = (state = INIT, action) => {
    let newState = [];
    switch (action.type) {
        case ACTION_TYPE.APARTMENT_GETTING:
            return [...state, action.payload];
        case ACTION_TYPE.APARTMENTS_GETTING:
            newState = [...state];

            const indexOld = newState.findIndex(el => el.id = action.payload.id)
            if (indexOld != -1)
                newState.splice(indexOld, 1, action.payload);
            else
                newState.push(action.payload);
                
            return newState;
        default:
            return state;
    }
};

export default apartmentDetail;