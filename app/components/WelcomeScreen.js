import React, {useRef} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Animated
} from 'react-native';

import {Svg, G, Line, Rect, Path} from 'react-native-svg';

import {COLOR_DARK_BLUE, COLOR_DARK_BROWN, COLOR_LIGHT_BLUE, COLOR_LIGHT_BROWN} from './styles/default.value';


const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }


const WelcomeScreen = () => {

  return (
    <View style={styles.container}>
        <FadeInView style={{flex:1}}>
            <Text style={styles.heading}>THIS IS WELCOME SCREEN! <Text style={{color: 'red'}}>DO NOT REMOVE THIS SCREEN! WE WILL USE IT AS WELL!</Text> HAVE NEW SCREEN? LET'S PUSH IT IN STACK CONTAINER IN NAVIGATION.JS!</Text>
            <View style={styles.textWrapper}>
                <Svg style={{position: 'absolute', top: -100 , right: -200}} height="100" width="200">
                    <Path
                        d = 'M 75 80 C 80 40, 100 10, 180 5 C 140 10, 100 40, 115 80 L 75 80 Z'
                        fill='#000'
                        stroke='none'
                    />
                </Svg>
                <Text style={styles.content}>HELLO WORLD! LET'S GET STARTED BUILDING OUR ANDROID APPLICATION! :)</Text>
            </View>
        </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: COLOR_DARK_BROWN,
        padding: 20
    },
    heading: {
        fontSize: 12,
        fontWeight: "bold",
        color: COLOR_DARK_BLUE,
        letterSpacing: 3,
        lineHeight: 20,
        textShadowColor: COLOR_LIGHT_BLUE,
        textShadowOffset: {
            width: 3,
            height: 2  
        },
        textShadowRadius: 2,
        marginBottom: 'auto'
    },
    textWrapper: {
        borderWidth: 3,
        marginBottom: 'auto',
        backgroundColor: COLOR_LIGHT_BROWN,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        opacity: 0.75,
        position: 'relative',
        overflow:'visible'
    },
    content: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLOR_DARK_BLUE,
        letterSpacing: 3,
        lineHeight: 30
    }
    });

    export default WelcomeScreen;
