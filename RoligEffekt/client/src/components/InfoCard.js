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
        <SafeAreaView>
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>{props.headerText} </Text>
                <Text style={styles.timeText}>{props.timeText}</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.container}>
                <Text style={styles.leftText}>{props.leftText} </Text>
                <Text style={styles.rightText}>{props.rightText}</Text>
            </SafeAreaView>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderBottomWidth: 'thin'
    },
    header: {
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '19px',
        width: '143px',
        height: '19px',
        left: '66px',
        top: '0px',
    },
    leftText: {
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '29px',

        height: '29px',
        left: '66px',
        right: '8px',
        top: '27px',
    },
    rightText: {
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '29px',

        height: '29px',
        left: '66px',
        right: '8px',
        top: '27px',

    },
    timeText: {
        color: '#BDBDBD',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '17px',

        width: '50px',
        height: '17px',
        right: '0px',
        top: '2px'
    },

  });

export default InfoCard;