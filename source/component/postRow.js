import React, {
	View,
	StyleSheet,
	Component,
	Text,
	Image,
	TouchableHighlight,
	Dimensions,
	PropTypes
} from 'react-native';

import moment from 'moment';
import Config from '../config';

const { width } = Dimensions.get('window');

class PostRow extends Component {
	static propTypes = {
		post: PropTypes.object,
		onPress: PropTypes.func
	};

	static defaultProps = {
		onPress: ()=>null
	};

	_renderPostMetas(post){
		let { category } = this.props;

		let metasContent = [];
		let dateText = moment(post.published).format("YYYY-MM-DD HH:mm");

		metasContent.push(
			<Text key='authorText'
				style={[styles['contentFooter text'],styles['contentFooter author']]}>
				{ post.author.name }
			</Text>
		);
		metasContent.push(
			<Text key='dateText'
				style={[styles['contentFooter text'],styles['contentFooter date']]}>
				{ dateText }
			</Text>
		);
		metasContent.push(
			<Text key='countText'
				style={[styles['contentFooter text'],styles['contentFooter count']]}>
				{post.comments + ' / ' + post.views}
			</Text>
		);
		return metasContent;
	}

	render() {
		const { post } = this.props;

		let authorAvatar = post.author.avatar || Config.defaultAvatar;

		return (
			<TouchableHighlight
				onPress={()=>{ this.props.onPress(post) }}
				underlayColor='#f2f2f2'
				key={post.id}>

				<View style={ styles.row }>
					<View style={styles.avatarWrapper}>
						<Image
							ref={view => this.imgView=view}
							style={styles.avatar}
							source={{uri: authorAvatar }}>
						</Image>
					</View>

					<View style={[styles.content]}>
						<Text
							ref={view => this.titleText=view}
							style={[styles.title]}>
							{ post.title }
						</Text>

						<View style={[styles.contentFooter]}>
							{ this._renderPostMetas(post) }
						</View>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}


var styles = StyleSheet.create({
	"row": {
		"flexDirection": "row",
		"borderBottomColor": "rgba(0, 0, 0, 0.02)",
		"borderBottomWidth": 1,
		"paddingTop": 20,
		"paddingRight": 20,
		"paddingBottom": 20,
		"paddingLeft": 20
	},
	"avatarWrapper": {
		"width": 90,
		"position": "absolute",
		"left": 20,
		"top": 25,
		"height": 65
	},
	"avatar": {
		"height": 40,
		"width": 40,
		"borderRadius": 20
	},
	"content": {
		"marginLeft": 60,
		"width": width - 100
	},
	"title": {
		"fontSize": 16
	},
	"contentFooter": {
		"marginTop": 10,
		"flexDirection": "row"
	},
	"contentFooter text": {
		"fontSize": 12
	},
	"contentFooter author": {
		"marginRight": 10
	},
	"contentFooter count": {
		"position": "absolute",
		"right": 0,
		"top": 0
	}
});


export default PostRow;
