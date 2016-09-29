import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../../action/post';
import Spinner from '../spinner';
import EndTag from '../endtag';
import ViewPage from '../view';
import QuestionRow from './questionRow';
import { postCategory } from '../../config';

const category = postCategory.question;

class QuestionList extends Component {

	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.questions||{}),
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.questions && nextProps.questions.length && nextProps.questions !== this.props.questions) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.questions)
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

	onListRowPress(question){
		this.props.router.push(ViewPage.question(), {
			id: question.Id,
			category: category,
			question
		});
	}

	renderListRow(question) {
		if(question && question.Qid){
			return (
				<QuestionRow 
					key={ question.Qid } 
					question={ question } 
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
  questions: state.post[category],
  ui: state.postListUI[category]
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}))(QuestionList);