import {combineReducers} from 'redux';
import loginInfo from './loginForm.reducer';
import user from './user.reducer';
import apartments from './apartmentList.reducer';
import apartmentDetails from './apartmentDetail.reducer';
import apartmentComments from  './apartmentComment.reducer';
import parameters from './parameter.reducer';
import input from './input.reducer';
import ui from './ui.reducer';

const reducers = combineReducers({
    user,
    ui,
    loginInfo,
    apartments,
    apartmentDetails,
    apartmentComments,
    parameters,
    input
});

export default reducers;