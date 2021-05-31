import React, { useState } from 'react';

import AppLoading from 'expo-app-loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useCachedResources } from 'react-native-rapi-ui';

import AppNavigator from './src/navigation/AppNavigator';

import axios from 'axios';

//const https = require("https")

export default function App(props) {
	async function _onPress() {
		console.log('Button pressed');
		axios
			.post('http://localhost:3000/getRealTimeIL1', {
				test: 'hejsan',
				MeterID: '5706567316639529',
			})
			.then((response) => {
				console.log('Sucessful respond. IL1: ', response.data.IL1);
			})
			.catch((error) => {
				console.log('Got error with respond', error);
			});
	}

	async function _liveInFetch() {
		console.log('Button pressed');
		axios
			.post('http://localhost:3000/liveInFetch', {
				liveIn: 'fetch',
			})
			.then((response) => {
				var status = response.data.status;
			})
			.catch((error) => {
				console.log('Got error with respond', error);
			});
	}

	const isLoadingComplete = useCachedResources();
	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return <AppLoading />;
	} else {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar style="auto" translucent />
				<AppNavigator />
			</SafeAreaView>
		);
	}
}
