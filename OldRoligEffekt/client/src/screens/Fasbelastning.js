import React from 'react';
import { Layout, Section, SectionContent, Text } from 'react-native-rapi-ui';

import ProgressRing from '../components/ProgressRing';

const fasBelastning = {
	labels: ["Fas 1:", "Fas 2:", "Fas 3:"], // optional
	data: [0.4, 0.6, 0.8]
  };


export default function () {
	return (
		<Layout>
			<Section>
				<ProgressRing data={fasBelastning}/>
			</Section>	
		</Layout>
	);
}
