import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as AuthorAction from '../../action/author';
import AuthorPostRow from './authorPostRow';
import EndTag from '../endtag';
import Spinner from '../spinner';
import ViewPage from '../view';
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

	renderListFooter() {
		const { ui } = this.props;
		if (ui.postPagePending) {
			return <Spinner/>;
		}
		if(ui.postPageEnabled!==true){
			return <EndTag/>;
		}
	}

	formatAuthorPostDate(post){
		if(post.Avatar){
			post.Avatar = this.props.avatar;
		}
		post.AuthorEnabled = false;
		return post;
	}

	onListRowClick(post){
		const postInfo = this.formatAuthorPostDate(post);
		this.props.router.push(ViewPage.post(), {
			id: postInfo.Id,
			post: postInfo,
			category
		});
	}

	renderListRow(post) {
		if(post && post.Id){
			return (
				<AuthorPostRow 
					key={ post.Id } 
					post={ post }
					onRowPress={ this.onListRowClick.bind(this) }/>
			)
		}
	}


	render() {
		return (
			<ListView
				showsVerticalScrollIndicator
				removeClippedSubviews
				enableEmptySections
				onEndReachedThreshold={ 10 }
				initialListSize={ 10 }
				pagingEnabled={ false }
				scrollRenderAheadDistance={ 150 }
				dataSource={ this.state.dataSource }
				renderRow={ (e)=>this.renderListRow(e) }
				renderFooter={ (e)=>this.renderListFooter(e) }>
			</ListView>
		);
	}
}

export default connect((state, props) => ({
  posts : state.author[props.blogger].posts,
  ui: state.authorUI[props.blogger]
}), dispatch => ({ 
  authorAction : bindActionCreators(AuthorAction, dispatch)
}))(AuthorPostList);