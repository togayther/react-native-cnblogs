import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../../action/post';
import NewsRow from './newsRow';
import Spinner from '../spinner';
import EndTag from '../endtag';
import ViewPage from '../view';
import { postCategory } from '../../config';
import { CommonStyles, ComponentStyles } from '../../style';

const category = postCategory.news;

class NewsList extends Component {
	
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.news||{}),
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.news && nextProps.news.length && nextProps.news !== this.props.news) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.news)
			});
		}
	}

	renderListFooter() {
		const { ui, news } = this.props;
		if (ui.pagePending) {
			return <Spinner/>;
		}
		if(ui.refreshPending!==true && ui.pageEnabled!==true && news.length){
			return <EndTag/>;
		}
	}

	onListRowPress(news){
		this.props.router.push(ViewPage.post(), {
			id: news.Id,
			category: category,
			post: news
		});
	}

	renderListRow(news) {
		if(news && news.Id){
			return (
				<NewsRow 
					key={ news.Id } 
					news={ news } 
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
  news : state.post[category],
  ui: state.postListUI[category]
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}))(NewsList);