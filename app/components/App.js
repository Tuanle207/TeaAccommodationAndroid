import React from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {COLOR_DARK_BLUE, COLOR_DARK_BROWN} from './styles/default.value'
const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HELLO WORLD! LET'S GET STARTED BUILDING OUR ANDROID APPLICATION! :)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_DARK_BROWN,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLOR_DARK_BLUE,
    letterSpacing: 3,
    lineHeight: 30
  }
});

export default App;
