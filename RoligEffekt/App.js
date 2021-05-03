import React from 'react';
import { StyleSheet, Text, Button, SafeAreaView } from 'react-native';
import SegmentedButton from './client/src/components/SegmentedButton'

export default function App() {
  console.log("App executed")

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButton segmentOne='Översikt' segmentTwo='Detalj' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7879F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
