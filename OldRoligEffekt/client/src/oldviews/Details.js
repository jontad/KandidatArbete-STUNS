import React, { Component } from 'react';
import { Text, SafeAreaView } from 'react-native';

import InfoGraph from '../components/InfoGraph'
import SectionTitle from '../components/SectionTitle'

const data = {
    labels: ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50]
      }
    ]
};

class Details extends Component {


  render() {
    return (
      <SafeAreaView >
          <SectionTitle paddingTop='20px' fontSize='30px' text='Vecka 1' color='white'/>
          <InfoGraph data={data}/>
      </SafeAreaView>
    );
  }
}


export default Details;