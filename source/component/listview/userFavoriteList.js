import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UserFavoriteRow from './userFavoriteRow';
import Spinner from '../spinner';
import EndTag from '../endtag';
import ViewPage from '../view';
import { postCategory } from '../../config';

const category = postCategory.favorite;

class UserFavoriteList extends Component {
	
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.favorites||{}),
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.favorites && nextProps.favorites.length && nextProps.favorites !== this.props.favorites) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.favorites)
			});
		}
	}

	renderListFooter() {
		const { ui } = this.props;
		if (ui.pagePending) {
			return <Spinner/>;
		}
		if(ui.refreshPending!==true && ui.pageEnabled!==true){
			return <EndTag/>;
		}
	}

	onListRowPress(favorite){
		this.props.router.push(ViewPage.favorite(), {
			id: favorite.Id,
			post: favorite,
			category: favorite.Category,
			favorite
		});
	}

	renderListRow(favorite) {
		if(favorite && favorite.WzLinkId){
			return (
				<UserFavoriteRow 
					key={ favorite.WzLinkId } 
					favorite={ favorite } 
					onRowPress={ (e)=>this.onListRowPress(e) } />
			)
		}
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
				renderRow={ (e)=>this.renderListRow(e) }
				renderFooter={ (e)=>this.renderListFooter(e) }>
			</ListView>
		);
	}
}

export default connect((state, props) => ({
    favorites: state.user[category],
    ui: state.userListUI[category]
}), dispatch => ({ 

}))(UserFavoriteList);