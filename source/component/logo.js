import React, { Component } from 'react';
import {
	Image,
} from 'react-native';

import { ComponentStyles } from '../style';

const appLogo = require('../image/logo.png');

class Logo extends Component {

	constructor(props) {
	    super(props);
	}

	render() {
	    return (
	    	<Image
              style={ [ComponentStyles.avatar, this.props.style] } 
              source={ appLogo } />
	    )
	}
}

export default Logo;


