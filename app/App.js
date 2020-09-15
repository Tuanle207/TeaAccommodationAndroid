import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

import {store, persistor} from './store'
import Navigation from './components/Navigation';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigation />
            </PersistGate>
        </Provider>
    )
}


export default App;