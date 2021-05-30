import React from 'react';
import { Dimensions } from 'react-native';

import { SectionContent } from 'react-native-rapi-ui';
import { ProgressChart } from 'react-native-chart-kit';

/*
Graph component that shows energy usage
*/
const screenWidth = Dimensions.get('window').width;
function ProgressRing(props) {
	return (
		<SectionContent>
			<ProgressChart
				data={props.data}
				width={Dimensions.get('window').width - 36}
				height={220}
				strokeWidth={16}
				radius={32}
				chartConfig={chartConfig}
				style={graphStyle}
			/>
		</SectionContent>
	);
}

const graphStyle = {
	marginVertical: 170,
	marginHorizontal: -30,
	borderRadius: 16,
};

const chartConfig = {
	backgroundGradientFrom: '#FFFFFF',
	backgroundGradientTo: '#FFFFFF',
	color: (opacity = 1) => `rgba(32, 113, 181, ${opacity})`,

	barPercentage: 0.5,
	labelColor: (opacity = 1) => `rgba(32, 113, 181, ${opacity})`,
	propsForLabels: {
		//fontFamily: 'monospace',
	},
};

export default ProgressRing;
