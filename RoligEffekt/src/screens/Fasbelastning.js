import React, { Component } from 'react';
import { Layout, Section, SectionContent } from 'react-native-rapi-ui';

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
		this.fetchDataTimeout = setTimeout(this.fetchData, 2000);
	};

	componentDidMount() {
		console.log('--------Fasbelastning.js DID MOUNT------------');
		this.fetchData();
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
