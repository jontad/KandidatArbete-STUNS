import React, { Component, createRef } from 'react';
import { Text, Layout, Section, SectionContent } from 'react-native-rapi-ui';
import axios from 'axios';
import InfoGraph from '../components/InfoGraph';
import * as Notifications from 'expo-notifications';

import { config } from '../config';

const effekt = {
	labels: ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'],
	datasets: [
		{
			data: [20, 45, 28, 80, 99, 43, 50],
		},
	],
};

class Detalj extends Component {
    constructor() {
	super();

	this.state = {
	    effekt: {
		labels: ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'],
		datasets: [{
		    data: [20, 45, 28, 80, 80, 43, 40],
		}],
	    } 
	}

	this.fetchData = this.fetchData.bind(this);
    }

    _sortArraykWh(data){
	//console.log(data);
	var returnArray = [0,0,0,0,0,0,0];

	for(x in data){
	    if(data[x].dayNo != 0){
		returnArray[(data[x].dayNo) - 1] = data[x].kwH;
	    }
	}
	for (x in data){
	    if (data[x].dayNo == 0){
		returnArray[6] = data[x].kwH;
	    }
	}
	return returnArray;
    }
    
    
    	async _getRealtimeData() {
		await axios
			.post(config.baseUrl + '/getRealTimeData', {
				test: 'hejsan',
				MeterID: '5706567316639529',
			})
			.then((response) => {
			    var sortedArrayKwh = this._sortArraykWh(response.data.kwHWeek);
			    var stateEffekt = this.state.effekt;
			    stateEffekt.datasets[0].data = sortedArrayKwh;
			    this.setState({effekt: stateEffekt});
			    return response;
			})
			.catch((error) => {
				console.log('Got error in _getReatltimeData', error);
			});
	}

	async fetchData() {
		await this._getRealtimeData();
		this.fetchDataTimeout = setTimeout(this.fetchData, 2000);
	}

	async componentDidMount() {
		console.log('--------Home.js DID MOUNT------------');
		//fetch data for detalj screen
		await this.fetchData();
	}

    render() {
	return (
		<Layout>
			<Section>
				<SectionContent>
					<Text size="xl">Energianvändning denna vecka (kWh)</Text>
				</SectionContent>
				<SectionContent>
					<InfoGraph data={this.state.effekt} />
				</SectionContent>
			</Section>
		</Layout>
	);
    }
}
export default Detalj;
