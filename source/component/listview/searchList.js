import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Spinner from '../spinner';
import EndTag from '../endtag';
import ViewPage from '../view';
import SearchRow from './searchRow';
import { postCategory } from '../../config';

class SearchList extends Component {

	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.searchs||{}),
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.searchs && nextProps.searchs.length && nextProps.searchs !== this.props.searchs) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.searchs)
			});
		}
	}

	renderListFooter() {
		const { ui } = this.props;
		if (ui.pagePending) {
			return <Spinner/>;
		}
		if(ui.pagePending!==true && ui.pageEnabled!==true){
			return <EndTag/>;
		}
	}

	onListRowPress(search){
		if(search.Id){
			this.props.router.push(ViewPage.searchDetail(), {
                id: search.Id,
                post: search,
                category: postCategory.home
            });
         }
         else{
            openLink(search.LinkUri);
         }
	}

	renderListRow(search) {
		if(search && search.Id){
			return (
				<SearchRow 
					key={ search.Id } 
					search={ search } 
					onRowPress={ (e)=>this.onListRowPress(e) } />
			)
		}
	}

	render() {
		return (
			<ListView
				ref = {(view)=> this.listView = view }
				showsVerticalScrollIndicator
				removeClippedSubviews
				enableEmptySections = { true }
				onEndReachedThreshold={ 10 }
				initialListSize={ 15 }
				pageSize = { 15 }
				pagingEnabled={ false }
				scrollRenderAheadDistance={ 150 }
				onEndReached = {(e)=>this.props.onListEndReached()}
				dataSource={ this.state.dataSource }
				renderRow={ (e)=>this.renderListRow(e) }
				renderFooter={ (e)=>this.renderListFooter(e) }>
			</ListView>
		);
	}
}

export default connect((state, props) => ({
  	searchs : state.search[props.category],
 	ui: state.searchUI[props.category]
}), dispatch => ({ 
	
}))(SearchList);