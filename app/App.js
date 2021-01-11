import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import { MenuProvider } from 'react-native-popup-menu';
import {store, persistor} from './store'
import Navigation from './components/Navigation';


const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MenuProvider>
                    <Navigation />
                </MenuProvider>
            </PersistGate>
        </Provider>
    );
};


export default App;