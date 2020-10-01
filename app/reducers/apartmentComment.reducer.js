import ACTION_TYPE from '../actions/type';
import apartmentDetail from './apartmentDetail.reducer';

const INIT = [];

const apartmentComment = (state = INIT, action) => {
    switch (action.type) {
        case ACTION_TYPE.COMMENTS_GETTING:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default apartmentComment;