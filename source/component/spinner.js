import React, { Component } from 'react';
import {
	ActivityIndicatorIOS,
	ProgressBarAndroid,
	Platform
} from 'react-native';

import { StyleConfig } from '../style';

class Spinner extends Component {
	render() {
		if (Platform.OS === 'android') {
			return (
				<ProgressBarAndroid {...this.props} color={ StyleConfig.mainColor }/>
			)
		}
		return (
			<ActivityIndicatorIOS animating={true} {...this.props} color={ StyleConfig.mainColor }/>
		)
	}
}

export default Spinner;


