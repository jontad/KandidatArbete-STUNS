import React, { Component } from 'react';
import { SafeAreaView, Button, TouchableOpacity } from 'react-native';

import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

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

			token: '',
			notification: false,
		};

		this.fetchData = this.fetchData.bind(this);
	}

	async _getRealtimeData() {
		await axios
			.post(config.baseUrl + '/getRealTimeData', {
				test: 'hejsan',
				MeterID: '5706567316639529',
			})
			.then((response) => {
				var watt = response.data.data.ActivePowerPlus;
				var kwh = response.data.kwH;
				var priceToday = kwh * 0.4;
				kwh = kwh.toFixed(5);
				priceToday = priceToday.toFixed(4);
				this.setState({ usageToday: kwh });
				this.setState({ currentWatt: watt });
				this.setState({ priceToday: priceToday });
				console.log(this.state.currentWatt);

				if (this.state.watt == 2500) {
					this.sendPushNotification('Effektanvändning', 'Du använder just nu ' + watt + '! Det börjar bli tungt!');
				}

				return response;
			})
			.catch((error) => {
				console.log('Got error in _getReatltimeData', error);
			});
	}

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

	async fetchData() {
		await this._getRealtimeData();
		await this._getLiveInData();
		this.fetchDataTimeout = setTimeout(this.fetchData, 2000);

		console.log(this.state.situation);
	}

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
		console.log(token);

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
		console.log('--------Hem.js DID MOUNT------------');

		//fetch data for home screen
		await this.fetchData();

		//create token for notifications and check permissions
		await this.registerForPushNotificationsAsync().then((tok) => {
			this.setState({ token: tok });
		});
	}

	//for testing notifications
	changeSituation() {
		let sit = this.state.situation;
		if (sit === 'EXPORT') {
			this.setState({ situation: 'IMPORT' });
			this.sendPushNotification('ELSITUATION', 'EXPORT');
		} else {
			this.setState({ situation: 'EXPORT' });
			this.sendPushNotification('ELSITUATION', 'IMPORT');
		}
		console.log(this.state.situation);
	}

	informationButton() {
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

	render() {
		return (
			<SafeAreaView>
				<Button onPress={() => this.changeSituation()} title="Send Notification" color="#841584" />

				<InfoCard headerText="Användande nu" leftText={this.state.currentWatt + ' w'} />
				<InfoCard
					headerText="Förbrukning idag"
					leftText={this.state.usageToday + ' kWh'}
					rightText={this.state.priceToday + ' kr'}
				/>
				<InfoCard headerText="Förbrukning denna vecka" leftText="62.5 kWh" rightText="129.02 kr" />
				<InfoCard
					headerText="Situation"
					leftText={this.state.situation}
					infoPosition={this.informationButton(this.props.navigation)}
				/>
			</SafeAreaView>
		);
	}
}

export default Hem;
