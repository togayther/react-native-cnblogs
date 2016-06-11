import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import _ from 'lodash';
import Config from '../config';
import { decodeHTML }  from '../common';
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
			<View key={ 'meta-count' } style={ CommonStyles.metaRight }>
				<Text style={ CommonStyles.hint }>
					{post.comments + ' / ' + post.views}
				</Text>
			</View>
		);
		return metasContent;
	}

	render() {
		const { post } = this.props;

		let postTitle = decodeHTML(post.title);

		return (
			<TouchableHighlight
				onPress={()=>{ this.props.onPress(post) }}
				underlayColor={ StyleConfig.touchablePressColor }
				key={ post.id }>
				<View style={ CommonStyles.rowContainer }>
					<View>
						<Text style={ CommonStyles.title }>
							{ postTitle }
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
