import React, { Component } from 'react';
import {
	Text,
	View,
	Image
} from 'react-native';

import moment from 'moment';
import { decodeHTML } from '../common';
import { CommonStyles, PostDetailStyles } from '../style';

class AuthorHeader extends Component {

	constructor(props) {
	    super(props);
	}

	render() {
		let { author } = this.props;

		let authorAvatar = author.logo;
    	let updated = moment(author.updated).format("YYYY-MM-DD");
    	let authorName = decodeHTML(author.title);
    	return (
    		<View style={ CommonStyles.detailHeader }>
		        <View style={ PostDetailStyles.headerAuthor }>
		          {
		            authorAvatar?
		            <Image style={ PostDetailStyles.headerAvatar }
		              source={{ uri: authorAvatar }}>
		            </Image>
		            : null
		          }
		        </View>
		        <View style={ CommonStyles.titleContainer }>
		          <Text style={ CommonStyles.title }>
		            { authorName }
		          </Text>
		          <View style={ CommonStyles.meta}>
		            <Text>
		              博文数：{ author.postcount }
		            </Text>
		            <View style={ CommonStyles.metaRight}>
		            	<Text>
			              最近更新：{ updated }
			            </Text>
		            </View>
		          </View>
		        </View>
		    </View>
    	)
	}
}

export default AuthorHeader;


