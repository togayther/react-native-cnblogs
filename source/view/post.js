import React, {
	View,
	StyleSheet,
	ScrollView,
	Component,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	Platform
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import Spinner from '../component/spinner';
import { makeColor } from '../common/util';
import * as PostAction from '../action/post';
import Config from '../config';

const { height, width } = Dimensions.get('window');
const postAuthorWidth = 100;
const authorAvatarSize = 40;
const contentPadding = 15;

class PostPage extends Component {
	constructor(props) {
		super(props);
		this.headerColor = makeColor();
		this.state = {
			didFocus: false
		}
	}

	componentDidMount() {
		const { from, postAction, id, post, category } = this.props;
		if(!post.string){
			postAction.getPostById(category, id);
		}
	}

	componentDidFocus() {
		this.setState({
			didFocus: true
		});
	}

	componentWillUnmount() {
		//this.props.actions.removeTopicCacheById(this.props.id);
	}

	_renderPostContent(post) {
		if (this.state.didFocus && post && post.string) {
			return (
				<View style={styles.content}>
					<HTMLView router={ this.props.router } value={ post.string }/>
				</View>
			)
		}
		return (
			<Spinner size="large" animating={true} style={{marginTop:20}} />
		)
	}

	_renderContent(post) {

		if(!post){
			return (
				<Spinner
				size="large"
				animating={true}
				style={{marginTop:20}}/>
			);
		}

		let { author_name, author_avatar }  = post;
		let publishDate = moment(post.createdate).format("YYYY-MM-DD HH:mm");
		author_avatar = author_avatar|| Config.defaultAvatar;

		return (
			<ScrollView>
				<View style={[styles.header, {backgroundColor: this.headerColor}]}>
					<View style={styles.authorWrapper}>
						<TouchableOpacity>
							<Image
								source={{ uri:author_avatar }}
								style={styles.authorAvatar}>
							</Image>
						</TouchableOpacity>
					</View>

					<View style={styles.titleWrapper}>
						<Text style={styles.title}>
							{ post.title }
						</Text>

						<View style={styles.titleFooter}>
							<Text style={styles.footerMeta}>
								{ author_name }
							</Text>
							<Text style={styles.footerMeta}>
								{ publishDate }
							</Text>
						</View>
					</View>
				</View>

				{ this._renderPostContent(post) }
			</ScrollView>
		)
	}

	render() {
		const { post } = this.props;

		return (
			<View style={[styles.container]}>
				{ this._renderContent(post) }
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: width,
		backgroundColor: '#fff',
		height: height
	},
	header: {
		flex: 1,
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingRight: 20,
		paddingLeft: 20,
		paddingBottom: 20,
		paddingTop: 20
	},
	authorWrapper: {
		flex: 1,
		alignItems:"flex-start"
	},
	authorAvatar: {
		width: authorAvatarSize,
		height: authorAvatarSize,
		borderRadius: authorAvatarSize / 2
	},
	titleWrapper: {
		width: width - postAuthorWidth,
		flexDirection: 'column'
	},
	title: {
		color: 'rgba(255,255,255,0.9)',
		width: width - postAuthorWidth,
		flex: 1
	},
	titleFooter: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5
	},
	footerMeta: {
		color: 'rgba(255,255,255,0.6)',
		marginRight: 10,
		fontSize: 12
	},
	content: {
		paddingRight: contentPadding,
		paddingLeft: contentPadding,
		paddingTop: contentPadding,
		paddingBottom: contentPadding,
		backgroundColor: '#fff'
	}
});

export default connect((state, props) => ({
  post: state.post.posts[props.id] || props.post
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
	withRef: true
})(PostPage);