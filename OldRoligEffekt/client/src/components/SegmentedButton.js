import React, {useState} from 'react'
import { StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

/*
Docs: https://docs.expo.io/versions/latest/sdk/segmented-control/

*/

function SegmentedButton(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const _onChange = (event) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
    };

    return (
        <SegmentedControl
        values={[props.segmentOne, props.segmentTwo]}
        selectedIndex={selectedIndex}
        onChange={_onChange}
        tintColor='#5DB075'
        style={styles(props).button}
        />
    ); 
}

const styles = (props) => StyleSheet.create({
    button: {
        position: 'absolute',
        height: '50px',
        left: '13px',
        right: '20px',
        top: '144px'
    },
  });

export default SegmentedButton;