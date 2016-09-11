import React, { Component } from 'react';
import {
	View,
	Image,
} from 'react-native';

import { ComponentStyles } from '../style';

class Logo extends Component {

	constructor(props) {
	    super(props);
	}

	render() {
	    return (
	    	<Image
              style={ [ComponentStyles.avatar, this.props.style] } 
              source={ require('../image/ic_launcher_red.png') } />
	    )
	}
}

export default Logo;


