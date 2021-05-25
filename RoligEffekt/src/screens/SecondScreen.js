import React, { Component } from 'react';
import { View } from 'react-native';
import { Layout, TopNav, Text, theme } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
import axios from "axios";


class SecondScreen extends Component {
    constructor(){
	super();
	this.state = {
	    currentWatt: 0,
	     
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
		       return response;
		   }).catch((error) => {
		       console.log(error);
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
	    
		<Layout>
			<TopNav
				middleContent="Förklaring Export/Import"
				leftContent={<Ionicons name="chevron-back" size={20} color="#2071B5" />}
				//leftAction={() => navigation.goBack()}
			/>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* This text using ubuntu font */}
				<Text fontWeight="bold">This is the second screen</Text>
				<Text fontWeight="bold">This is the second screen</Text>
				<Text fontWeight="bold">This is the second screen</Text>
			</View>
		</Layout>
		
	);
    }
} 
export default SecondScreen;
