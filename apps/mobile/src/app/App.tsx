/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
// import Svg, { Path } from 'react-native-svg';

export const App = () => {

  const scrollViewRef = useRef<null | ScrollView>(null);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          ref={(ref) => {
            scrollViewRef.current = ref;
          }}
          contentInsetAdjustmentBehavior="automatic"
        >
          <Button mode="contained">Contained</Button>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


export default App;
