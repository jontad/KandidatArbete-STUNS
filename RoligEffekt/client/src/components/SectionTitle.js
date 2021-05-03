import React, {Component} from 'react'
import { Text } from 'react-native';

import styled from 'styled-components';


const SectionTitle = (props) => 
<SectionTitleWrapper paddingTop={props.paddingTop} fontSize={props.fontSize}>
    {props.text}
</SectionTitleWrapper>

//font-family: 'Inter', sans-serif;
const SectionTitleWrapper = styled.Text`
    
    font-size: ${props => props.fontSize || '18px'};
    text-align: center;
    text-transform: ${props => props.none || 'uppercase'};
    padding-top: ${props => props.paddingTop || '20px'};
    padding-bottom: 10px;
`

export default SectionTitle;