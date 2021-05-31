import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import { SectionContent } from 'react-native-rapi-ui';
import { BarChart } from "react-native-chart-kit";

/*
Graph component that shows energy usage
*/

const screenWidth = {}

function InfoGraph(props) {
  return(
    <SectionContent style={styles.container}>
      <BarChart
        style={graphStyle}
        data={props.data}
        width={Dimensions.get('window').width - 36}
        height={295}
        yAxisLabel={props.label}
        chartConfig={chartConfig}
        yLabelsOffset={25}
      />
		</SectionContent>
    

  );  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
});

const graphStyle = {
    marginVertical: 100,
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