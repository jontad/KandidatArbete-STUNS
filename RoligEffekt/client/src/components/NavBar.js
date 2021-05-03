import React, {Component} from 'react'
import { Text } from 'react-native';

import styled from 'styled-components';

class NavBar extends Component {

    renderLeftButton = (type, link) => {
        return type === "back" ? 
            <LinkWrapper to={link}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '24px'}}/>
            </LinkWrapper> 
            : null
    };

    renderRightButton = (type, link) => {
        return type === "profile" ?
            <LinkWrapper to={link}>
                <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '24px' }}/>
            </LinkWrapper>
            : null
    };

    render(){
        return (
            <NavBarWrapper>

                <NavBarSpaceLeft>
                    {this.renderLeftButton(this.props.leftButtonType, this.props.leftButtonLink)}
                </NavBarSpaceLeft>

                <NavBarSpaceCenter>
                    <LinkWrapper to="/home" style={{ color: 'black' }}>
                        <FontAwesomeIcon 
                            icon={faSeedling}
                            style={{ fontSize: '32px' }} 
                            />
                    </LinkWrapper>
                </NavBarSpaceCenter>

                <NavBarSpaceRight>
                    {this.renderRightButton(this.props.rightButtonType, this.props.rightButtonLink)}
                </NavBarSpaceRight>

            </NavBarWrapper>
            
        )
    }
}