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
		let { comment } = this.props;
		let dateText = moment(comment.published).format("YYYY-MM-DD HH:mm");
		return (
			<TouchableHighlight
				onPress={ this.props.onPress }
				underlayColor={ StyleConfig.touchablePressColor }
				key={ comment.id }>
				<View style={ CommonStyles.rowContainer }>
					<View>
						<Text style={ CommonStyles.title }>
							{ comment.content }
						</Text>
					</View>
					<View style={ CommonStyles.meta }>
						<Text style={ CommonStyles.hint }>
							{ comment.author.name }
						</Text>
						<Text style={ [CommonStyles.hint, CommonStyles.metaRight] }>
							{ dateText }
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default CommentRow;
