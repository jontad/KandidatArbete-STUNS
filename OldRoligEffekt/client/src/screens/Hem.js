import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';

import { Layout } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

import InfoCard from '../components/InfoCard'


class Hem extends Component({ navigation }) {
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
		await axios.post("http://localhost:3000/getRealTimeData", {
				test: "hejsan",
				MeterID: "5706567316639529",		
			})
		.then((response) => {
			var watt = response.data.data.ActivePowerPlus;
			this.setState({currentWatt: watt});
			console.log(this.state.currentWatt);
			return response;
		})
		.catch((error) => {
			console.log("Got error with respond", error);
		});
		//Get LIVE-IN API DATA
		await axios.post("http://localhost:3000/liveInFetch",{
				liveIn: "fetch",
		})
		.then((response) => {
				var status = response.data.status;
				if(status.output){
				this.setState({situation: "EXPORT"});
				}
				else{
				this.setState({situation: "IMPORT"});
				}
		})
		.catch((error) => {
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


	informationButton() {
		return(
			<TouchableOpacity onPress={() => {navigation.navigate('SecondScreen');}}>
				<Ionicons
					name="information-circle-outline"
					style={{ opacity: 0.6, color: '#2071B5' }}
					size={25}
				/>	
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<Layout>
				<SafeAreaView >
					<InfoCard 
					headerText='Användande nu' 
					leftText={this.state.currentWatt}  
					/>
					<InfoCard 
					headerText='Förbrukning idag' 
					leftText='18.2 kWh' 
					rightText='22.12 kr' 
					/>
					<InfoCard 
					headerText='Förbrukning denna vecka' 
					leftText='62.5 kWh' 
					rightText='104.16 kr' 
					/>
					<InfoCard 
					headerText='Situation' 
					leftText={this.state.situation + ': 98% (Neg)'}
					timeText={informationButton(navigation)}
					/>
				</SafeAreaView>
			</Layout>
	
		);
	}
}

export default Hem;