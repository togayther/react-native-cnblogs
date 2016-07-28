import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import { CommonStyles, StyleConfig } from '../style';

const logoText = 'B';

class CodeLogo extends Component {

	constructor(props) {
	    super(props);
	}

	render() {
	    return (
	    	<View style={ CommonStyles.codeLogoContainer }>
				<Text style={ CommonStyles.codeLogoText }>
					{ logoText }
				</Text>
			</View>
	    )
	}
}

export default CodeLogo;


