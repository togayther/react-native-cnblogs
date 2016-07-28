import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { decodeHTML }  from '../common';
import { postCategory } from '../config';
import { PostStyles, CommonStyles, StyleConfig } from '../style';

class OfflinePostRow extends Component {

	static defaultProps = {
		onPress: () => null
	};

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	renderPostRowMetas(post){

		let offlineDate = moment(post.offlineDate).startOf('minute').fromNow();
		let postCategoryLabel,
			postCategoryColor;
		if (post.category == postCategory.news) {
			postCategoryLabel = "#新闻";
			postCategoryColor = StyleConfig.secondaryColor;
		}else{
			postCategoryLabel = "#博文";
			postCategoryColor = StyleConfig.mainColor;
		}

		let metasContent = [];
		metasContent.push(
			<Text key='meta-date' style={ PostStyles.metaText }>
				离线日期：{ offlineDate }
			</Text>
		);
		metasContent.push(
			<View key='meta-count' style={ PostStyles.metaRight } >
				<Text style={ [PostStyles.metaText, {color: postCategoryColor }] }>
					{ postCategoryLabel }
				</Text>
			</View>
		);
		return metasContent;
	}

	render() {
		
		const { post } = this.props;

		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(post) }}
				underlayColor={ StyleConfig.touchablePressColor }
				key={ post.id }>

				<View style={ CommonStyles.rowContainer }>
					<View style={ PostStyles.authorInfo }>
						{
							post.authorAvatar?
							<Image ref={view => this.imgView=view}
								style={ PostStyles.authorAvatar }
								source={{ uri: post.authorAvatar }}>
							</Image>
							:null
						}
						
						<Text style={ PostStyles.authorName }>
							{ post.authorName }
						</Text>
					</View>

					<View>
						<Text style={ PostStyles.title }>
							{ post.title }
						</Text>
					</View>

					{
						post.summary?
						<View>
							<Text style={ PostStyles.summary }>
								{ post.summary }
							</Text>
						</View>
						: null
					}

					<View style={ PostStyles.metaInfo }>
						{ this.renderPostRowMetas(post) }
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default OfflinePostRow;
