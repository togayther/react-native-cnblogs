import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import entities  from 'entities';
import _ from 'lodash';
import Config from '../config';
import { CommonStyles, StyleConfig } from '../style';

class AuthorPostRow extends Component {

	constructor(props) {
		super(props);
	}

	static defaultProps = {
		onPress: () => null
	};

	renderPostMetas(post){
		let metasContent = [];
		let dateText = moment(post.published).format("YYYY-MM-DD HH:mm");

		metasContent.push(
			<Text key={ 'meta-date' } style={ CommonStyles.hint }>
				{ dateText }
			</Text>
		);
		metasContent.push(
			<Text key={ 'meta-count' } style={ [CommonStyles.hint, CommonStyles.metaRight] }>
				{post.comments + ' / ' + post.views}
			</Text>
		);
		return metasContent;
	}

	render() {
		const { post } = this.props;
		return (
			<TouchableHighlight
				onPress={()=>{ this.props.onPress(post) }}
				underlayColor={ StyleConfig.touchablePressColor }
				key={ post.id }>
				<View style={ CommonStyles.rowContainer }>
					<View>
						<Text style={ CommonStyles.title }>
							{ entities.decodeHTML(post.title) }
						</Text>
					</View>
					<View style={ CommonStyles.meta }>
						{ this.renderPostMetas(post) }
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default AuthorPostRow;
