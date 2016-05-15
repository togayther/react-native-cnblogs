import React, {
	View,
	StyleSheet,
	Component,
	ListView,
	Dimensions,
	RefreshControl
} from 'react-native';

import PostRow from './postRow';
import Spinner from './spinner';
import * as PostAction from '../action/post';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window');

class PostList extends Component {
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.posts)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.posts && nextProps.posts.length && nextProps.posts !== this.props.posts) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
			});
		}
	}

	_onEndReached() {
		const { postAction, posts, category, ui } = this.props;
		if (posts.length) {
			postAction.getPostByCategoryWithPage(category, {
				page: ui.page + 1,
				limit: ui.limit
			});
		}
	}

	_renderFooter() {
		const { ui } = this.props;
		if (ui.reachedEndPending) {
			return (
				<View style={styles.reachedEndLoading}>
					<Spinner size="large"/>
				</View>
			)
		}
		return null;
	}

	_onPostRowClick(post){
		let { category } = this.props;

		this.props.router.toPost({
			id: post.id,
			category: category,
			post
		});
	}

	renderRow(post) {
		let { category } = this.props;
		if(post && post.id){
			return (
				<PostRow key={ post.id } post={ post } category={ category }
					onPress={ this._onPostRowClick.bind(this) } />
			)
		}
		return null;
	}


	render() {
		let { ui, category, postAction } = this.props;

		let refreshControl = <RefreshControl
							refreshing={ ui.pullRefreshPending }
							onRefresh={ ()=>{ postAction.getPostByCategory(category) } } />;

		return (
			<ListView
				showsVerticalScrollIndicator
				removeClippedSubviews
				enableEmptySections
				initialListSize={10}
				pagingEnabled={false}
				scrollRenderAheadDistance={120}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				onEndReachedThreshold={10}
				onEndReached={this._onEndReached.bind(this)}
				renderFooter={this._renderFooter.bind(this)}
				refreshControl={ refreshControl }>
			</ListView>
		);
	}
}

const styles = StyleSheet.create({
	reachedEndLoading: {
		paddingTop: 20,
		paddingBottom: 20
	}
});

export default connect((state, props) => ({
  posts : state.post[props.category],
  ui: state.listui[props.category]
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}))(PostList);