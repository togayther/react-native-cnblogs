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
import { decodeHTML }  from '../../common';
import { postCategory } from '../../config';
import { ComponentStyles, CommonStyles, StyleConfig } from '../../style';

class OfflineRow extends Component {

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
			<Text key='meta-date' style={ ComponentStyles.metaText }>
				离线日期：{ offlineDate }
			</Text>
		);
		metasContent.push(
			<View key='meta-count' style={ ComponentStyles.metaRight } >
				<Text style={ [ComponentStyles.metaText, {color: postCategoryColor }] }>
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
					<View style={ ComponentStyles.authorInfo }>
						{
							post.authorAvatar?
							<Image ref={view => this.imgView=view}
								style={ ComponentStyles.authorAvatar }
								source={{ uri: post.authorAvatar }}>
							</Image>
							:null
						}
						
						<Text style={ ComponentStyles.authorName }>
							{ post.authorName }
						</Text>
					</View>

					<View>
						<Text style={ ComponentStyles.title }>
							{ post.title }
						</Text>
					</View>

					{
						post.summary?
						<View>
							<Text style={ ComponentStyles.summary }>
								{ post.summary }
							</Text>
						</View>
						: null
					}

					<View style={ ComponentStyles.metaInfo }>
						{ this.renderPostRowMetas(post) }
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default OfflineRow;
