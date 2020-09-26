import {combineReducers} from 'redux';
import loginInfo from './loginForm.reducer';
import user from './user.reducer';
import ui from './ui.reducer';

const reducers = combineReducers({
    user,
    ui,
    loginInfo
});

export default reducers;