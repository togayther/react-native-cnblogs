import React, { Component } from 'react';
import {
	ActivityIndicator,
	Platform
} from 'react-native';

import { StyleConfig } from '../style';

class Spinner extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ActivityIndicator {...this.props} 
				color={ StyleConfig.mainColor } 
				animating={true} />
		)
	}
}

export default Spinner;


