import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Calculator from './components/Calculator/Calculator';

const App = () => {
  const [level, setLevel] = useState(3);

  const changeLevelHandler = () => {
    return 0;
  };

  return (
    <View style={styles.container}>
      <Calculator level={level} onChangeLevel={changeLevelHandler} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
