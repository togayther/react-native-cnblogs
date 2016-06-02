import React, { Component } from 'react';
import {
	TouchableOpacity
} from 'react-native';

import { CommonStyles, StyleConfig } from '../style';
import Icon from 'react-native-vector-icons/Entypo';

const backerIcon = 'chevron-small-left';
const backerSize = 24;

class Backer extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let { router } = this.props;

		return (
			<TouchableOpacity onPress={ ()=>{ router.pop() } }>
		      <Icon
		        name={ backerIcon }
		        size={ backerSize }
		        style={ CommonStyles.navbarMenu }
		      />
		    </TouchableOpacity>
		)
	}
}

export default Backer;


