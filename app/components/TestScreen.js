import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {View, Text, Pressable} from 'react-native';

import {doSomething} from '../actions';
import { COLOR_DARK_BLUE, COLOR_DARK_BROWN, COLOR_LIGHT_BROWN} from './styles/default.value';
const TestScreen = ({doSomething, test, navigation}) => {

    useEffect(() => {
        console.log(`Default! data: \'${test.data}\', error: \'${test.error}\'`);
    }, []);

    useEffect(() => {
        console.log(`Changed! data: \'${test.data}\', error: \'${test.error}\'`);
    }, [test])

    return (
        <View style={{display: 'flex', alignItems: 'center', flex: 1, padding: 20, backgroundColor: COLOR_LIGHT_BROWN}}>
            <Text style={{
                textAlign: 'center', 
                textTransform: 'uppercase', 
                fontWeight: 'bold',
                lineHeight: 30,
                fontSize: 20,
                marginBottom: 'auto',
                color: COLOR_DARK_BROWN}}
            >
                This is sreen just for testing redux setup!</Text>
            <Pressable onPress={() => doSomething()} 
                style={{
                    marginBottom: 'auto',
                    backgroundColor: COLOR_DARK_BROWN,
                    width: '50%',
                    height: 40,
                    borderRadius: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}>
                <Text style={{
                    color: '#fff',
                    textTransform: 'uppercase',
                    fontSize: 12
                }}> Touch here to test </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Welcome')} 
                style={{
                    marginBottom: 'auto',
                    backgroundColor: COLOR_DARK_BROWN,
                    width: '60%',
                    height: 50,
                    borderRadius: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10
                    }}>
                <Text style={{
                    color: '#fff',
                    textTransform: 'uppercase',
                    fontSize: 12,
                    textAlign: 'center'
                }}> Touch here to navigate to Welcome screen </Text>
            </Pressable>
        </View>
    )
}

const mapStateToProps = state => ({
        test: state.test
});


export default connect(mapStateToProps, {doSomething})(TestScreen) ;