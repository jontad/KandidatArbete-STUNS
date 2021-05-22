import React from 'react'

import { Dimensions } from 'react-native';
import { SectionContent } from 'react-native-rapi-ui';
import { BarChart } from "react-native-chart-kit";

/*
Graph component that shows energy usage
*/

const screenWidth = {}

function InfoGraph(props) {
  return(
    <SectionContent>
      <BarChart
        style={graphStyle}
        data={props.data}
        width={Dimensions.get('window').width - 25}
        height={295}
        chartConfig={chartConfig}
        yLabelsOffset={25}
      />
		</SectionContent>
  );  
}

const graphStyle = {
    marginVertical: 100,
    marginHorizontal: -26,
    borderRadius: 16,
  }

const chartConfig = {
  backgroundGradientFrom: '#c4f2f2',
  backgroundGradientTo: '#9aeaea',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

  barPercentage: 0.5,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForLabels: {
    fontFamily: 'sans-serif',
  },
  
}

export default InfoGraph;