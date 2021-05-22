import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import { SectionContent } from 'react-native-rapi-ui';
import { ProgressChart } from "react-native-chart-kit";

/*
Graph component that shows energy usage
*/
const screenWidth = Dimensions.get('window').width;
function ProgressRing(props) {
  return(
    <SectionContent style={styles.container}>
        <ProgressChart
            data={props.data}
            width={Dimensions.get('window').width - 60}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={graphStyle}
        />
    </SectionContent>
    

  );  
}



const styles = StyleSheet.create({
  container: {
    
  },
});

const graphStyle = {
    marginVertical: 170,
    borderRadius: 16,
}

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF', 
  backgroundGradientTo: '#FFFFFF',
  color: (opacity = 1) => `rgba(32, 113, 181, ${opacity})`,

  barPercentage: 0.5,
  labelColor: (opacity = 1) => `rgba(32, 113, 181, ${opacity})`,
  propsForLabels: {
    fontFamily: 'monospace',
  },
}

export default ProgressRing;