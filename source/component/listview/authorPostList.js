import React, { Component } from 'react';
import {
	View,
	ListView,
	RefreshControl
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as AuthorAction from '../../action/author';
import AuthorPostRow from './authorPostRow';
import Spinner from '../spinner';
import { CommonStyles } from '../../style';
import { postCategory } from '../../config';

const category = postCategory.home;

class AuthorPostList extends Component {
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.posts),
			scrollButtonVisiable: false
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
				<View style={ CommonStyles.pageContainer }>
					<Spinner/>
				</View>
			)
		}
		return null;
	}

	onListRowClick(post){
		let { router, author } = this.props;

		//通过作者详情返回的文章列表，官方接口未附加作者头像
		post.authorAvatar = author.logo;

		router.toPost({
			id: post.id,
			category,
			post
		});
	}

	renderListRow(post) {
		if(post && post.id){
			return (
				<AuthorPostRow 
					key={ post.id } 
					post={ post }
					onPress={ this.onListRowClick.bind(this) }/>
			)
		}
		return null;
	}


	render() {
		return (
			<ListView
				ref = {(view)=> this.listView = view }
				showsVerticalScrollIndicator
				removeClippedSubviews
				enableEmptySections
				onEndReachedThreshold={ 10 }
				initialListSize={ 10 }
				pagingEnabled={ false }
				scrollRenderAheadDistance={ 150 }
				dataSource={ this.state.dataSource }
				renderRow={ (e)=>this.renderListRow(e) }
				onEndReached={ (e)=>this.onListEndReached(e) }
				renderFooter={ (e)=>this.renderListFooter(e) }>
			</ListView>
		);
	}
}

export default connect((state, props) => ({
  posts : state.author.details[props.name].entry,
  ui: state.authorDetailUI[props.name]
}), dispatch => ({ 
  authorAction : bindActionCreators(AuthorAction, dispatch)
}))(AuthorPostList);