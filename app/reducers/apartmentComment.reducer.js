import ACTION_TYPE from '../actions/type';

const INIT = [];

const apartmentComment = (state = INIT, action) => {
    
    const newState = [...state];
    switch (action.type) {
        case ACTION_TYPE.COMMENTS_GETTING:
            const oldIndex = newState.findIndex(el => el.apartmentId === action.payload.apartmentId);
            if (oldIndex != -1)
                newState.splice(oldIndex, 1, action.payload);
            else
                newState.push(action.payload);
            return newState;
        case ACTION_TYPE.COMMENT_CREATING:
            const index = newState.findIndex(el => el.apartmentId == action.payload.apartmentId);
            newState[index].comments.push(action.payload);
            return newState;
        default:
            return state;
    }
};

export default apartmentComment;