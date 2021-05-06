import React, {useState} from 'react'
import { StyleSheet, Image, View, Text,  } from 'react-native';
import { Card } from "react-native-elements";

/*
Single infocard displayed on home page 
that shows desired information
*/

const users = [{
       name: 'brynn',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },]

function InfoCard(props) {
   return(
    <Card wrapperStyle={styles.wrapperStyle} containerStyle={styles.container}>
        <Card.FeaturedTitle style={styles.headerText}>{props.headerText}</Card.FeaturedTitle>
        {
         <Card.FeaturedSubtitle style={{color: 'rgba(70, 70, 70, 1)'}}>{props.leftText}</Card.FeaturedSubtitle>        
        }
        <Card.FeaturedTitle style={styles.timeText}>{props.timeText}</Card.FeaturedTitle>
        {
         <Card.FeaturedSubtitle style={styles.rightText}>{props.rightText}</Card.FeaturedSubtitle>        
        }
        
    </Card>
   );
    
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'rgba(158, 150, 150, .1)', 
        borderRadius: '10px', 
        width: '80%'
    },
    headerText: {
        color: 'rgba(70, 70, 70, 1)'
    },
    leftText: {
        color: 'rgba(70, 70, 70, 1)'
    },
    timeText: {
        color: '#BDBDBD', 
        fontSize: '12px',  
        position: 'absolute', 
        right: 0, 
        top: 0
    },
    rightText: {
        color: 'rgba(70, 70, 70, 1)',  
        position: 'absolute', 
        right: 0, 
        bottom: 0
    },
  });

export default InfoCard;