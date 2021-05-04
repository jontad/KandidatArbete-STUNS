import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import SegmentedButton from './client/src/components/SegmentedButton'
import LongButton from './client/src/components/LongButton'
import TestButton from './client/src/components/TestButton'
import InfoCard from './client/src/components/InfoCard'

import axios from 'axios';

function onPressButton() {
  console.log("Hello")
}

export default function App() {

  console.log("App executed")
  //<LongButton title='Hello' backgroundColor='#5DB075' textColor='white'/>
  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButton segmentOne='Översikt' segmentTwo='Detalj' />
    
      <TestButton onClick={() => onPressButton()} title='Hello' backgroundColor='blue' textColor='white' 
    />
      <InfoCard headerText='Förbrukning idag' leftText='234 kWh' rightText='129.02kr' timeText='8m' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#7879F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
