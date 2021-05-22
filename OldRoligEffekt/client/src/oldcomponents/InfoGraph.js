import React from 'react'
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";

/*
Graph component that shows energy usage
*/

function InfoGraph(props) {
  return(
    <SafeAreaView style={styles.container}>
      <BarChart
      style={graphStyle}
      data={props.data}
      width={windowWidth}
      height={220}
      //yAxisLabel="kWh"
      chartConfig={chartConfig}
      yLabelsOffset={25}
      />
    </SafeAreaView>

  );  
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    
  },
});

const graphStyle = {
  marginVertical: 8,
  borderRadius: 20,
  width: '10%'
}

const chartConfig = {
  backgroundGradientFrom: "#5db075",
  backgroundGradientTo: '#5DB075',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

  yLabelsOffset: 100,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForLabels: {
    fontFamily: 'monospace',
  },
}

export default InfoGraph;