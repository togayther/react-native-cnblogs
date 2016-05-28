import React, { Component } from 'react';
import {
	ActivityIndicatorIOS,
	ProgressBarAndroid,
	Platform
} from 'react-native';

const spinnerColor = '#09a097';

class Spinner extends Component {
	render() {
		if (Platform.OS === 'android') {
			return (
				<ProgressBarAndroid {...this.props} color={ spinnerColor }/>
			)
		}
		return (
			<ActivityIndicatorIOS animating={true} {...this.props} color={ spinnerColor }/>
		)
	}
}

export default Spinner;


