import React, {useState} from 'react'
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

/*
Single infocard displayed on home page 
that shows desired information
*/

function InfoCard(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const _onChange = (event) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.itemOrientation}>
                <Text style={styles.header}>{props.headerText} </Text>
                <Text style={styles.timeText}>{props.timeText}</Text>
                <Text style={styles.leftText}>{props.leftText} </Text>
                <Text style={styles.rightText}>{props.rightText}</Text>
            </SafeAreaView>
            <SafeAreaView style={[styles.border]}>
                
            </SafeAreaView>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' 
    },
    itemOrientation: {
        width: '50%'
    },
    header: {
        fontWeight: '600',
        fontSize: '16px',
        opacity: '0.7', 
        flex: 3   
    },
    timeText: {
        color: '#BDBDBD',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
    },
    leftText: {
        fontWeight: '500',
        fontSize: '24px',

    },
    rightText: {
        fontWeight: '500',
        fontSize: '24px',
    },
    
    border: {
        borderColor: 'rgba(158, 150, 150, .3)', 
        borderBottomWidth: 'thin'
    }
  });

export default InfoCard;