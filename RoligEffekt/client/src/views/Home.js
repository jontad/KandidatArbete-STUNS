import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import InfoCard from '../components/InfoCard'
import axios from "axios";;
import TestButton from "../components/TestButton"

class Home extends Component {
    constructor(){
	super();
	this.state = {
	    currentWatt: 0,
	    usageToday: 0,
	    situation: "EXPORT",
	    facility: 0,
	    trend: "unknown",
	     
	}
	this.fetchData = this.fetchData.bind(this);
    }
    async _getData(){
	//GET RealtimeDATA
    	await axios.post("http://localhost:3000/getRealTimeData",
		   {
		       test: "hejsan",
		       MeterID: "5706567316639529",
		       
		   }).then((response) => {
		       var watt = response.data.data.ActivePowerPlus;
		       this.setState({currentWatt: watt});
		       console.log(this.state.currentWatt);
		       return response;
		   }).catch((error) => {
		       console.log("Got error with respond", error);
		   });
	//Get LIVE-IN API DATA
	await axios.post("http://localhost:3000/liveInFetch",
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
	this.fetchDataTimeout = setTimeout(this.fetchData, 5000);
    }
    
    componentDidMount(){
	console.log("--------Home.js DID MOUNT------------");
	this.fetchData();
    }

    render() {
	return (
		<SafeAreaView >
		<InfoCard 
            headerText='Användande nu' 
            leftText={this.state.currentWatt} 
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
            leftText={this.state.situation}
            timeText='8m'
		/>
	
		</SafeAreaView>
		
	);
    }
}


export default Home;
