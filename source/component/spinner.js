import React, { Component } from 'react';
import {
	ActivityIndicatorIOS,
	ProgressBarAndroid,
	Platform,
	ActivityIndicator
} from 'react-native';

import { StyleConfig } from '../style';

class Spinner extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ActivityIndicator 
				size = { 'large' }
				color={ StyleConfig.color_primary } 
				{...this.props} />
		)
	}
}

export default Spinner;


