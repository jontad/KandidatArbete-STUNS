import React from 'react';
import { Text, Layout, Section,	SectionContent } from 'react-native-rapi-ui';
import { ScrollView } from 'react-native';

import InfoGraph from '../components/InfoGraph';


const effekt = {
    labels: ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50]
      }
    ]
};


export default function () {
	return (
		<Layout>
			<ScrollView>
				<Section>
					<SectionContent>
						<Text size='xl'>Energianvändning denna vecka (kWh)</Text>
					</SectionContent>
					<InfoGraph data={effekt}/>
				</Section>
			</ScrollView>				
		</Layout>
	);
}
