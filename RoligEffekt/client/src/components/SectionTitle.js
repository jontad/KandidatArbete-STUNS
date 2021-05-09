import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

const SectionTitle = (props) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles(props).title}>
                {props.text}
            </Text>
        </SafeAreaView>    
    );
}


const styles = (props) => StyleSheet.create({
    container: {
      justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: props.fontSize,
        color: props.color,
        paddingBottom: '10px',
        paddingTop: props.paddingTop,
    },
  });
  

export default SectionTitle;