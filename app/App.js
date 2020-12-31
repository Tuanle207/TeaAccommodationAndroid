import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
// import SplashScreen from 'react-native-splash-screen';

import {store, persistor} from './store'
import Navigation from './components/Navigation';


const App = () => {

    // useEffect(() => {
    //     SplashScreen.hide();
    // }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigation />
            </PersistGate>
        </Provider>
    );
};


export default App;