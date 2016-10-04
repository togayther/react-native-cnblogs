import React, { Component } from 'react';
import {
	Image,
} from 'react-native';

import { ComponentStyles } from '../style';
import { logoImage } from '../common';

class Logo extends Component {

	constructor(props) {
	    super(props);
	}

	render() {
	    return (
	    	<Image
              style={ [ComponentStyles.avatar, this.props.style] } 
              source={ logoImage } />
	    )
	}
}

export default Logo;


