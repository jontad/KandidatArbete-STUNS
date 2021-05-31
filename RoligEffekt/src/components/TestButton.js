import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const TestButton = (props) => (
	<TouchableOpacity onPress={props.onPress} style={styles(props).button}>
		<Text style={styles(props).text}>{props.title}</Text>
	</TouchableOpacity>
);

const styles = (props) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			paddingHorizontal: 10,
		},
		button: {
			alignItems: 'center',
			padding: '11px ',
			backgroundColor: props.backgroundColor,
			overflow: 'hidden',
			borderRadius: 100,
			position: 'absolute',
			height: '51px',
			left: '16px',
			right: '16px',
			bottom: '342px',
		},
		text: {
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: 20,
			color: props.textColor,
		},
	});

export default TestButton;
