import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';

import { Layout } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import InfoCard from '../components/InfoCard';

export default function ({ navigation }) {
	const [currentWatt, setCurrentWatt] = useState(0);
	const [usageToday, setUsageToday] = useState(0);
	const [situation, setSituation] = useState('EXPORT');
	const [facility, setFacility] = useState(0);
	const [trend, setTrend] = useState('unknown');

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log('--------Hem.js DID MOUNT------------');
			_getRealTimeData();
			_getLiveInData();
		}, 10000);
		return () => clearTimeout(timer);
	}, []);

	async function _getRealTimeData() {
		//GET RealtimeDATA
		await axios
			.post('http://localhost:3000/getRealTimeData', {
				test: 'hejsan',
				MeterID: '5706567316639529',
			})
			.then((response) => {
				var watt = response.data.data.ActivePowerPlus;
				setCurrentWatt(watt);
				console.log(currentWatt);
				return response;
			})
			.catch((error) => {
				console.log('Got error with respond', error);
			});
	}

	async function _getLiveInData() {
		await axios
			.post('http://localhost:3000/liveInFetch', {
				liveIn: 'fetch',
			})
			.then((response) => {
				var status = response.data.status;
				if (status.output) {
					setSituation('EXPORT');
				} else {
					setSituation('IMPORT');
				}
			})
			.catch((error) => {
				console.log('Got error with respond', error);
			});
	}

	function informationButton() {
		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('SecondScreen');
				}}
			>
				<Ionicons name="information-circle-outline" style={{ opacity: 0.6, color: '#2071B5' }} size={25} />
			</TouchableOpacity>
		);
	}

	return (
		<Layout>
			<SafeAreaView>
				<InfoCard headerText="Användande nu" leftText="1337 w" />
				<InfoCard headerText="Förbrukning idag" leftText="18.2 kWh" rightText="22.12 kr" />
				<InfoCard headerText="Förbrukning denna vecka" leftText="62.5 kWh" rightText="129.02 kr" />
				<InfoCard headerText="Situation" leftText="Export: 98% (Neg)" infoPosition={informationButton(navigation)} />
			</SafeAreaView>
		</Layout>
	);
}
