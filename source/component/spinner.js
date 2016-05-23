import React, { Component } from 'react';
import {
	ActivityIndicatorIOS,
	ProgressBarAndroid,
	Platform
} from 'react-native';

import Styles from '../style';

class Spinner extends Component {
	render() {
		if (Platform.OS === 'android') {
			return (
				<ProgressBarAndroid {...this.props}/>
			)
		}
		return (
			<ActivityIndicatorIOS animating={true} {...this.props}/>
		)
	}
}

export default Spinner;


