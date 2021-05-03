import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, SafeAreaView } from 'react-native';
import LongButton from './client/src/components/LongButton'


export default function App() {
  console.log("App executed")

  return (
    <SafeAreaView style={styles.container}>
      <LongButton title='Login' buttonColor='white' textColor='#5DB075'/>
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
