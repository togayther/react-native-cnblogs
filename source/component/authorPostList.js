import React, { Component } from 'react';
import {
	View,
	ListView,
	RefreshControl
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthorAction from '../action/author';
import AuthorPostRow from './authorPostRow';
import Spinner from './spinner';
import { CommonStyles } from '../style';
import ScrollButton from './scrollButton';
import { scrollEnabledOffset } from '../config';
import refreshControlConfig from '../config/refreshControlConfig';

const category = 'home';

class AuthorPostList extends Component {
	
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
		const { authorAction, posts, ui, name } = this.props;
		if (posts.length && ui.postPageEnabled) {
			authorAction.getAuthorDetailWithPage(name, {
				pageIndex: ui.postPageIndex + 1
			});
		}
	}

	renderListFooter() {
		const { ui } = this.props;
		if (ui.postPagePending) {
			return (
				<View style={ CommonStyles.pageSpinner }>
					<Spinner size="large"/>
				</View>
			)
		}
		return null;
	}

	onListRowClick(post){
		let { router, author } = this.props;

		//通过作者详情返回的文章列表，官方接口未附加作者头像
		post.author.avatar = author.logo;

		router.toPost({
			id: post.id,
			authorDetailEnabled: false,
			category,
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
		if(post && post.id){
			return (
				<AuthorPostRow key={ post.id } post={ post }
					onPress={ this.onListRowClick.bind(this) }/>
			)
		}
		return null;
	}

	renderRefreshControl(){
		let { ui, authorAction, name } = this.props;
		return (
			<RefreshControl { ...refreshControlConfig }
				refreshing={ ui.refreshPending }
				onRefresh={ ()=>{ authorAction.getAuthorDetail(name) } } />
		);
	}

	render() {
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
					refreshControl={ this.renderRefreshControl() }>
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
  posts : state.author.details[props.name].entry,
  ui: state.authorDetailUI[props.name]
}), dispatch => ({ 
  authorAction : bindActionCreators(AuthorAction, dispatch)
}))(AuthorPostList);