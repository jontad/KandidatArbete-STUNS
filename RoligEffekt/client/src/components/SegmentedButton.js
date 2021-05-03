import React, {useState} from 'react'
import { StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

function SegmentedButton(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const _onChange = (event) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
    };

    return (
        <SegmentedControl
        values={[props.segmentOne, props.segmentTwo]}
        selectedIndex={selectedIndex}
        onChange={ _onChange }
        style={ styles(props).button }
        />
    ); 
}

const styles = (props) => StyleSheet.create({
    button: {
        padding: '11px ',
        backgroundColor: props.buttonColor,
        //overflow: 'hidden', 
        borderRadius: '5000px',
        position: 'absolute',
        height: '50px',
        left: '16px',
        right: '485px',
        top: '181px',
    },
  });

export default SegmentedButton;