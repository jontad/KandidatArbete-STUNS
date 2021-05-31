import React from 'react';
import { StyleSheet } from 'react-native';

import { Card } from 'react-native-elements';

/*
Single infocard displayed on home page 
that shows desired information
*/

function InfoCard(props) {
	return (
		<Card wrapperStyle={styles.wrapperStyle} containerStyle={styles.container}>
			<Card.FeaturedTitle style={styles.headerText}>{props.headerText}</Card.FeaturedTitle>
			{<Card.FeaturedSubtitle style={styles.leftText}>{props.leftText}</Card.FeaturedSubtitle>}
			<Card.FeaturedTitle style={styles.infoPosition}>{props.infoPosition}</Card.FeaturedTitle>
			{<Card.FeaturedSubtitle style={styles.rightText}>{props.rightText}</Card.FeaturedSubtitle>}
		</Card>
	);
}
const styles = StyleSheet.create({
	container: {
		borderColor: 'rgba(158, 150, 150, .1)',
		borderRadius: 10,
	},
	headerText: {
		color: 'rgba(70, 70, 70, 1)',
	},
	leftText: {
		color: 'rgba(70, 70, 70, 1)',
	},
	infoPosition: {
		position: 'absolute',
		right: -8,
		top: -12,
	},
	rightText: {
		color: 'rgba(70, 70, 70, 1)',
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
});

export default InfoCard;
