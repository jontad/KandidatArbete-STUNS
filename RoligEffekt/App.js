import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import SegmentedButton from './client/src/components/SegmentedButton'
import LongButton from './client/src/components/LongButton'
import TestButton from './client/src/components/TestButton'
import InfoCard from './client/src/components/InfoCard'

import axios from 'axios';


export default class App extends Component {
  
  _onPress(){
    console.log("Button pressed")
  }

  render(){
//<LongButton title='Hello' backgroundColor='#5DB075' textColor='white' height='51px' left='16px' right='16px' bottom='342px'/>
    return (
      <SafeAreaView style={styles.container}>
        <SegmentedButton segmentOne='Översikt' segmentTwo='Detalj' />
      
        <TestButton onPress={this._onPress} title='Yo' backgroundColor='blue' textColor='white' />
        <InfoCard headerText='Förbrukning idag' leftText='234 kWh' rightText='129.02kr' timeText='8m' />
      </SafeAreaView>
    );
    }
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#7879F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
