import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';

import * as Notifications from 'expo-notifications';
import axios from 'axios';
import { Ionicons, Entypo } from '@expo/vector-icons';

import InfoCard from '../components/InfoCard';
import { config } from '../config';

class Hem extends Component {
	constructor() {
		super();

		this.state = {
			currentWatt: 0,
			usageToday: 0,
			situation: 'EXPORT',
			facility: 0,
			trend: 'unknown',
			priceToday: 0,
			weekUsage: 0,
			weekPrice: 0,

			token: '',
			sendMessage: true,
		};

		this.fetchData = this.fetchData.bind(this);
	}

	/*** Retrieve data from database  ***/

	//HTTP-request to backend for realtime from smart meter
	async _getRealtimeData() {
		await axios
			.post(config.baseUrl + '/getRealTimeData', {
				test: 'hejsan',
				MeterID: config.meterID,
			})
			.then((response) => {
				var watt = response.data.data.ActivePowerPlus;
				var kwh = response.data.kwH;
				var priceToday = kwh * 0.4;
				var kwhWeekData = response.data.kwHWeek;
				var weeklyUse = 0;
				for (x in kwhWeekData) {
					weeklyUse = weeklyUse + kwhWeekData[x].kwH;
				}
				var priceWeek = weeklyUse * 0.4;
				kwh = kwh.toFixed(5);
				priceToday = priceToday.toFixed(4);
				priceWeek = priceWeek.toFixed(4);
				weeklyUse = weeklyUse.toFixed(5);
				this.setState({ usageToday: kwh });
				this.setState({ currentWatt: watt });
				this.setState({ priceToday: priceToday });
				this.setState({ weekUsage: weeklyUse });
				this.setState({ weekPrice: priceWeek });
				console.log(this.state.currentWatt);

				// if (this.state.watt > 2500 && this.state.sendMessage == true) {
				// 	this.sendPushNotification('Effektanvändning', 'Du använder just nu ' + watt + '! Det börjar bli tungt!');
				// 	this.setState({ sendMessage: false });
				// }

				// if (this.state.watt < 2500) {
				// 	this.setState({ sendMessage: true });
				// }

				return response;
			})
			.catch((error) => {
				console.log('Got error in _getReatltimeData', error);
			});
	}

	//HTTP-request to LiveIn-API to determine if Sweden is exporting/importing electricity
	async _getLiveInData() {
		await axios
			.post(config.baseUrl + '/liveInFetch', {
				liveIn: 'fetch',
			})
			.then((response) => {
				var status = response.data.status;

				if (status.output) {
					if (this.state.situation === 'IMPORT') {
						this.sendPushNotification('ELSITUATION', 'Just nu är din el exporterad!');
					}
					this.setState({ situation: 'EXPORT' });
				} else {
					if (this.state.situation === 'EXPORT') {
						this.sendPushNotification('ELSITUATION', 'Just nu är din el importerad. Försök undvika att använda el!');
					}
					this.setState({ situation: 'IMPORT' });
				}
			})
			.catch((error) => {
				console.log('Got error in _getLiveInData', error);
			});
	}

	//Data is fetched every 2 seconds
	async fetchData() {
		await this._getRealtimeData();
		await this._getLiveInData();
		this.fetchDataTimeout = setTimeout(this.fetchData, 2000);
	}

	/*** Functions for sending notifications and checking permissions ***/
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

	/*** Render different components in app ***/
	renderEmoji() {
		currentSituation = this.state.situation;
		if (currentSituation === 'EXPORT') {
			return <Entypo name="emoji-happy" size={24} color="green" />;
		} else {
			return <Entypo name="emoji-sad" size={24} color="red" />;
		}
	}

	renderInformationButton() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('SecondScreen');
				}}
			>
				<Ionicons name="information-circle-outline" style={{ opacity: 0.6, color: 'black' }} size={25} />
			</TouchableOpacity>
		);
	}

	/*** Fetch data at start ***/
	async componentDidMount() {
		console.log('--------Home.js DID MOUNT------------');

		//fetch data for home screen
		await this.fetchData();

		//create token for notifications and check permissions
		await this.registerForPushNotificationsAsync().then((tok) => {
			this.setState({ token: tok });
		});
	}

	render() {
		return (
			<SafeAreaView>
				<InfoCard headerText="Användande nu" leftText={this.state.currentWatt + ' w'} />
				<InfoCard
					headerText="Förbrukning idag"
					leftText={this.state.usageToday + ' kWh'}
					rightText={this.state.priceToday + ' kr'}
				/>
				<InfoCard
					headerText="Förbrukning denna vecka"
					leftText={this.state.weekUsage + ' kWh'}
					rightText={this.state.weekPrice + ' kr'}
				/>
				<InfoCard
					headerText="Situation"
					leftText={this.state.situation}
					rightText={this.renderEmoji()}
					infoPosition={this.renderInformationButton()}
				/>
			</SafeAreaView>
		);
	}
}

export default Hem;
