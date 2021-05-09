import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import InfoCard from '../components/InfoCard'

class Home extends Component {


  render() {
    return (
      <SafeAreaView >
        <InfoCard 
        headerText='Användande nu' 
        leftText='1337 w' 
        timeText='8m'
        />
         <InfoCard 
        headerText='Förbrukning idag' 
        leftText='234 kWh' 
        rightText='129.02 kr' 
        timeText='8m'
        />
         <InfoCard 
        headerText='Situation' 
        leftText='EXPORT'
        timeText='8m'
        />
      </SafeAreaView>
    );
  }
}


export default Home;