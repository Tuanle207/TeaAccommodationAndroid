import {StyleSheet} from 'react-native';

import {COLOR_DARK_BLUE} from './default.value'

/**
 * *  Group of styles for typography
 */
const typography = StyleSheet.create({
    title: {
        fontSize: 20,
        color: COLOR_DARK_BLUE,
        textTransform: 'uppercase',
        textAlign: 'center',
        letterSpacing: 5,
        fontWeight: 'bold'
    },
    emphasize: {
        color: COLOR_DARK_BLUE,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    normal: {
        color: '#000'
    }
});

export default typography;