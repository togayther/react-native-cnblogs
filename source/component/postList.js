import React, { Component } from 'react';
import {
	View,
	ListView,
	RefreshControl
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PostAction from '../action/post';
import PostRow from './postRow';
import Spinner from './spinner';
import { scrollEnabledOffset } from '../config';
import { CommonStyles } from '../style';
import refreshControlConfig from '../config/refreshControlConfig';
import ScrollButton from './scrollButton';

class PostList extends Component {
	
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.posts),
			scrollButtonVisiable: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.posts && nextProps.posts.length && nextProps.posts !== this.props.posts) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
			});
		}
	}

	onListEndReached() {
		const { postAction, posts, category, ui } = this.props;
		if (posts.length && ui.pageEnabled) {
			postAction.getPostByCategoryWithPage(category, {
				pageIndex: ui.pageIndex + 1
			});
		}
	}

	renderListFooter() {
		const { ui } = this.props;
		if (ui.pagePending) {
			return (
				<View style={ CommonStyles.pageSpinner }>
					<Spinner size="large"/>
				</View>
			)
		}
		return null;
	}

	onListRowPress(post){
		let { router, category } = this.props;
		router.toPost({
			id: post.id,
			category: category,
			post
		});
	}

	onScrollHandle(event){
		let offsetY = event.nativeEvent.contentOffset.y;
		let scrollButtonVisiable = false;
		if (offsetY > scrollEnabledOffset) {
        	scrollButtonVisiable = true;
		}else{
			scrollButtonVisiable = false;
		}

		this.setState({
			scrollButtonVisiable
		});
	}

	onScrollButtonPress(){
		this.listView.scrollTo( {y:0} );
	}

	renderListRow(post) {
		let { category } = this.props;
		if(post && post.id){
			return (
				<PostRow key={ post.id } post={ post } category={ category }
					onPress={ this.onListRowPress.bind(this) } />
			)
		}
		return null;
	}

	render() {
		let { ui, category, postAction } = this.props;

		let refreshControl = <RefreshControl
							refreshing={ ui.refreshPending }
							{ ...refreshControlConfig }
							onRefresh={ ()=>{ postAction.getPostByCategory(category) } } />;

		return (
			<View style={ CommonStyles.container }>
				<ListView
					ref = {(view)=> this.listView = view }
					showsVerticalScrollIndicator
					removeClippedSubviews
					enableEmptySections
					onScroll = { this.onScrollHandle.bind(this) }
					onEndReachedThreshold={ 10 }
					initialListSize={ 10 }
					pagingEnabled={ false }
					scrollRenderAheadDistance={ 150 }
					dataSource={ this.state.dataSource }
					renderRow={ this.renderListRow.bind(this) }
					onEndReached={ this.onListEndReached.bind(this) }
					renderFooter={ this.renderListFooter.bind(this) }
					refreshControl={ refreshControl }>
				</ListView>
				{
		        	this.state.scrollButtonVisiable  === true ?
		        	<ScrollButton onPress={ this.onScrollButtonPress.bind(this) }/>
		        	:null
		        }
			</View>
		);
	}
}

export default connect((state, props) => ({
  posts : state.post[props.category],
  ui: state.postListUI[props.category]
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}))(PostList);