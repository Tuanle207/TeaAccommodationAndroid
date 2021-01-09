import ACTION_TYPE from '../actions/type';

const INIT = [];

const apartmentDetail = (state = INIT, action) => {
    let newState = [];
    switch (action.type) {
        case ACTION_TYPE.APARTMENT_GETTING:
            newState = [...state];
            const oldIndex = newState.findIndex(el => el.id === action.payload.id);
            if (oldIndex != -1)
                newState.splice(oldIndex, 1, action.payload);
            else
                newState.push(action.payload);
            return newState;

        case ACTION_TYPE.APARTMENTS_GETTING:
        case ACTION_TYPE.MY_APARTMENTS_GETTING:
            return INIT;
        default:
            return state;
    }
};

export default apartmentDetail;