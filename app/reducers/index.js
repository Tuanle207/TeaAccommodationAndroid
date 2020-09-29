import {combineReducers} from 'redux';
import loginInfo from './loginForm.reducer';
import user from './user.reducer';
import apartments from './apartmentList.reducer';
import ui from './ui.reducer';

const reducers = combineReducers({
    user,
    ui,
    loginInfo,
    apartments
});

export default reducers;