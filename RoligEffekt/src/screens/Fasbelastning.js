import React from 'react';
import { Layout, Section, SectionContent } from 'react-native-rapi-ui';

import ProgressRing from '../components/ProgressRing';

const fasBelastning = {
	labels: ['fas 1', 'fas 2', 'fas 3'], // optional
	data: [0.4, 0.6, 0.8],
};

export default function () {
	return (
		<Layout>
			<Section>
				<SectionContent>
					<ProgressRing data={fasBelastning} />
				</SectionContent>
			</Section>
		</Layout>
	);
}
