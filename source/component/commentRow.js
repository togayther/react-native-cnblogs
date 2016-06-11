import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import HtmlRender from './htmlRender';
import { filterCommentData, decodeHTML } from '../common'
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

		let commentText = decodeHTML(comment.content);
		commentText = filterCommentData(commentText);

		let authorName = decodeHTML(comment.author.name);

		return (
			<TouchableHighlight
				onPress={ this.props.onPress }
				underlayColor={ StyleConfig.touchablePressColor }
				key={ comment.id }>
				<View style={ CommonStyles.rowContainer }>
					
					<View>
						<HtmlRender 
							renderCode = { false }
							containerStyle = { CommonStyles.title }
							content={ commentText }>
						</HtmlRender>
					</View>

					<View style={ CommonStyles.meta }>
						<Text style={ CommonStyles.hint }>
							{ authorName }
						</Text>
						<View style={ CommonStyles.metaRight }>
							<Text style={ CommonStyles.hint }>
								{ dateText }
							</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default CommentRow;
