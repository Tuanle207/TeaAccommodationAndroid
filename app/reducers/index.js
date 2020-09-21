import {combineReducers} from 'redux';
import test from './testReducer';
import loginInfo from './loginForm.reducer';
import user from './user.reducer';
import ui from './ui.reducer';

const reducers = combineReducers({
    user,
    test,
    ui,
    loginInfo
});

export default reducers;