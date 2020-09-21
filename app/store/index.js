import { createStore, compose, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
    'loginInfo'
    ],
    blacklist: [],
    };

const persistedReducer = persistReducer(persistConfig, reducers)

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(reduxThunk))
);

let persistor = persistStore(store);

export {
    store,
    persistor
};
