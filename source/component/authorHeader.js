import React, { Component } from 'react';
import {
	Text,
	View,
	Image
} from 'react-native';

import moment from 'moment';
import { CommonStyles, PostDetailStyles } from '../style';

class AuthorHeader extends Component {

	constructor(props) {
	    super(props);
	}

	render() {
		let { author } = this.props;

		let authorAvatar = author.logo;
    	let updated = moment(author.updated).format("YYYY-MM-DD HH:mm");
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
		            { author.title }
		          </Text>
		          <View style={ CommonStyles.meta}>
		            <Text>
		              { author.postcount }
		            </Text>
		            <Text style={ CommonStyles.metaRight}>
		              { updated }
		            </Text>
		          </View>
		        </View>
		    </View>
    	)
	}
}

export default AuthorHeader;


