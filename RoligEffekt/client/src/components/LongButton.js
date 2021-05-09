import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


/*
Horizontal button used in login/signup

*/


const LongButton = (props) => 
    <TouchableOpacity onPress={props.onPress} style={ styles(props).button }>
        <Text style={ styles(props).text }>
             {props.title}
        </Text>
    </TouchableOpacity>


const styles = (props) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        padding: '11px ',
        backgroundColor: props.backgroundColor,
        overflow: 'hidden', 
        borderRadius: '100px',
        position: 'absolute',
        height: props.height,
        left: props.left,
        right: props.right,
        bottom: props.bottom
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
        color: props.textColor
    },
  });

export default LongButton;