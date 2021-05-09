import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


import NavBar from './client/src/components/NavBar'


export default class App extends Component {
  
<<<<<<< Updated upstream
    _onPress(){
	console.log("Button pressed");
	axios.post("http://localhost:3000/getRealTimeIL1",
		   {
		       test: "hejsan",
		       MeterID: "5706567316639529",
		       
		   }).then((response) => {
		       console.log("Sucessful respond. IL1: ", response.data.IL1);
		   }).catch((error) => {
		       console.log("Got error with respond", error);
		   });
    }
=======

  _onPress(){
    console.log("Button pressed")
  }
>>>>>>> Stashed changes

  render(){
     
    return (
      <SafeAreaView style={styles.container}>
<<<<<<< Updated upstream
        <SegmentedButton segmentOne='Översikt' segmentTwo='Detalj' />
        <TestButton onPress={this._onPress} title='Yo' backgroundColor='blue' textColor='white' />
        
        <InfoCard headerText='Förbrukning idag' leftText='234 kWh' rightText='129.02kr' timeText='8m' />
        
        <TextField 
        autoCompleteType='username' 
        keyboardType='default' 
        placeholder='Username'  
        leftIcon={
          <Icon
          name='user'
          size={24}
          color='black'/>
        }
        />
=======
        <NavBar />
>>>>>>> Stashed changes
       
      </SafeAreaView>
    );
    }
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(208, 240, 200, 1)',
  },
});
