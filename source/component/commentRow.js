import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import entities  from 'entities';
import { CommentListRowStyles, CommonStyles, StyleConfig } from '../style';

class CommentRow extends Component {

	constructor(props) {
		super(props);
	}

	static defaultProps = {
		onPress: () => null
	};

	render() {
		const { comment } = this.props;
		
		return (
			<TouchableHighlight
				onPress={ this.props.onPress }
				underlayColor={ StyleConfig.touchablePressColor }
				key={ comment.id }>
				<View style={ CommonStyles.rowContainer }>
					<View>
						<Text style={ CommonStyles.title }>
							评论信息
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default CommentRow;
