import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../../action/post';
import BlinkRow from './blinkRow';
import Spinner from '../spinner';
import EndTag from '../endtag';
import ViewPage from '../view';
import { postCategory } from '../../config';

const category = postCategory.blink;

class BlinkList extends Component {
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.blinks||{}),
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.blinks && nextProps.blinks.length && nextProps.blinks !== this.props.blinks) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.blinks)
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

	onListRowPress(blink){
		this.props.router.push(ViewPage.blink(), {
			id: blink.Id,
			category: category,
			blink
		});
	}

	renderListRow(blink) {
		if(blink && blink.Id){
			return (
				<BlinkRow 
					key={ blink.Id } 
					blink={ blink } 
					category={ category }
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
   blinks : state.post[category],
   ui: state.postListUI[category]
}), dispatch => ({ 
   postAction : bindActionCreators(PostAction, dispatch)
}))(BlinkList);