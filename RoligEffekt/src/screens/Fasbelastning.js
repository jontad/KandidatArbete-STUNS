import React, { Component } from 'react';
import { Layout, Section, SectionContent } from 'react-native-rapi-ui';

import * as Notifications from "expo-notifications";
import axios from 'axios';

import ProgressRing from '../components/ProgressRing';
import { config } from '../config';

class Fasbelastning extends Component {
    constructor(){
	super();
	this.state = {
	    maximum: {il1: 10,
		      il2: 10,
		      il3:10},
	    fasBelastning: { labels: ['fas 1', 'fas 2', 'fas 3'],
			     data: [0.4, 0.6, 0.8]},

	    token: '',
	    sendMessage: true
	}
	this.fetchData = this.fetchData.bind(this);
    }
	 

	async _getData() {
	//	GET RealtimeDATA
		 await axios.post(config.baseUrl + '/getRealTimeData', {
		 	test: 'hejsan',
		 	MeterID: '5706567316639529',
		 })
		 .then((response) => {
		 	var il1 = response.data.data.IL1;
		 	var il2 = response.data.data.IL2;
		     var il3 = response.data.data.IL3;
		     
		 	var belIl1 = il1 / this.state.maximum.il1;
		 	var belIl2 = il2 / this.state.maximum.il2;
		     var belIl3 = il3 / this.state.maximum.il3;

		     if (belIl1 > 0.8 || belIl2 > 0.8 || belIl3 > 0.8 && this.state.sendMessage == true) {
			 if(this.state.sendMessage == true){
			    
			     this.sendPushNotification('FASBELASTNING', 'En av dina huvudsäkringar har nått 80% av sin maximala belastning!');}
			 
			
			 this.setState({ sendMessage: false });
			 
		     }
		     
		     if(belIl1 < 0.8 && belIl2 < 0.8 && belIl3 < 0.8){
	
			 this.setState({ sendMessage: true });
		     }

		     
		     
		     var fasbelastning = [belIl1, belIl2, belIl3];
		     
	 	     var stateFas = this.state.fasBelastning;
		 	stateFas.data = fasbelastning;
		 	this.setState({ fasBelastning: stateFas });

		     return response;
		 })
		 .catch((error) => {
		 	console.log(error);
		 });
	}

	fetchData = async () => {
		await this._getData();
		this.fetchDataTimeout = setTimeout(this.fetchData, 6000);
	};

    	async sendPushNotification(title, body) {
		const message = {
			to: this.state.token,
			sound: 'default',
			title: title,
			body: body,
			data: {},
		};

		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		});
	}

	async registerForPushNotificationsAsync() {
		let token;
		let { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			console.log('Failed to get push token for push notification!');
			return;
		}

		token = (await Notifications.getExpoPushTokenAsync()).data;

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		return token;
	}



    async componentDidMount() {
		console.log('--------Fasbelastning.js DID MOUNT------------');
	    await this.fetchData();

	    	//create token for notifications and check permissions
		await this.registerForPushNotificationsAsync().then((tok) => {
			this.setState({ token: tok });
		});
	}

	render() {
		return (
			<Layout>
				<Section>
					<SectionContent>
						<ProgressRing data={this.state.fasBelastning} />
					</SectionContent>
				</Section>
			</Layout>
		);
	}
}
export default Fasbelastning;
