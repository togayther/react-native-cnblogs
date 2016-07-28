import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import OfflinePostRow from '../component/offlinePostRow';

class OfflinePostList extends Component {
	
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.posts||{}),
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

	onListRowPress(post){
		this.props.router.toOfflinePost({
			id: post.id,
			category: this.props.category,
			post
		});
	}

	renderListRow(post) {
		if(post && post.id){
			return (
				<OfflinePostRow 
					key={ post.id } 
					post={ post } 
					onRowPress={ (e)=>this.onListRowPress(e) } />
			)
		}
		return null;
	}

	render() {

		return (
			<ListView
				ref = {(view)=> this.listView = view }
				removeClippedSubviews
				enableEmptySections = { true }
				onEndReachedThreshold={ 10 }
				initialListSize={ 10 }
				pageSize = { 10 }
				pagingEnabled={ false }
				scrollRenderAheadDistance={ 150 }
				dataSource={ this.state.dataSource }
				renderRow={ (e)=>this.renderListRow(e) }>
			</ListView>
		);
	}
}

export default connect((state, props) => ({
  posts : state.offline.posts
}), dispatch => ({ 

}))(OfflinePostList);