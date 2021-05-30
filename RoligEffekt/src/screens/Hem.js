import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import InfoCard from '../components/InfoCard'
import axios from "axios";;
import TestButton from "../components/TestButton"

class Hem extends Component {
    constructor(){
	super();
	this.state = {
	    currentWatt: 0,
	    usageToday: 0,
	    situation: "EXPORT",
	    facility: 0,
	    trend: "unknown",
	    priceToday:0,
	     
	}
	this.fetchData = this.fetchData.bind(this);
    }
    async _getData(){
	//GET RealtimeDATA
    	await axios.post("http://192.168.10.213:3000/getRealTimeData",
		   {
		       test: "hejsan",
		       MeterID: "5706567316639529",
		       
		   }).then((response) => {
		       var watt = response.data.data.ActivePowerPlus;
		       var kwh = response.data.kwH;
		       kwh = kwh.toFixed(5);
		       var priceToday = kwh*0.4;
		       priceToday = priceToday.toFixed(4);
		       this.setState({usageToday: kwh});
		       this.setState({currentWatt: watt});
		       this.setState({priceToday: priceToday});
		       console.log(this.state.currentWatt);
		       return response;
		   }).catch((error) => {
		       console.log(error);
		   });
	//Get LIVE-IN API DATA
	
	await axios.post("http://192.168.10.213:3000/liveInFetch",
		   {
		       liveIn: "fetch",
		   }).then((response) => {
		       var status = response.data.status;
		       if(status.output){
			   this.setState({situation: "EXPORT"});
		       }
		       else{
			   this.setState({situation: "IMPORT"});
		       }
		   }).catch((error) => {
		       console.log("Got error with respond", error);
		   });

    }
  
    fetchData = async() => {
	var dbData = await this._getData();
	this.fetchDataTimeout = setTimeout(this.fetchData, 2000);
    }
    
    componentDidMount(){
	console.log("--------Home.js DID MOUNT------------");
	this.fetchData();
    }

    render() {
	return (
		<SafeAreaView >
		<InfoCard headerText="Användande nu" leftText={this.state.currentWatt + " w"} />
		<InfoCard headerText="Förbrukning idag" leftText={this.state.usageToday +" kWh"} rightText={this.state.priceToday + " kr"} />
				<InfoCard headerText="Förbrukning denna vecka" leftText="62.5 kWh" rightText="30.02 kr" />
		<InfoCard headerText="Situation" leftText={this.state.situation} />
	
		</SafeAreaView>
		
	);
    }
}

export default Hem;
