import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={'#e74c4e'}
        style={styles.button}
        onPress={() => {}}>
        <Text style={styles.text}>Camera</Text>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'#e74c4e'}
        style={styles.button}
        onPress={() => {}}>
        <Text style={styles.text}>Visualizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#e74c3c',
    margin: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Roboto',
    padding: 5,
  },
});

export default App;
