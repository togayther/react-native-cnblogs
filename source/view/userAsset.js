import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Spinner from '../component/spinner';
import HintMessage from '../component/hintMessage';
import UserRender from '../component/header/user';
import UserBlinkList from '../component/listview/userBlinkList';
import UserQuestionList from '../component/listview/userQuestionList';
import UserPostList from '../component/listview/userPostList';
import UserFavoriteList from '../component/listview/userFavoriteList';
import { postCategory, storageKey } from '../config';
import * as UserAction from '../action/user';
import refreshControlConfig from '../config/refreshControl';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

class UserAssetPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount(){
		const { userAction, category } = this.props;
    	userAction.getUserAssetByCategory(category, {
			blogger: user.BlogApp,
		});
	}
	

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	onListEndReached(){
		const { userAction, category, assets, user, ui } = this.props;
		if (assets && assets.length && ui.pageEnabled) {
			userAction.getUserAssetByCategoryWithPage(category, {
				blogger: user.BlogApp,
				pageIndex: ui.pageIndex + 1
			});
		}
	}
	
	renderListRefreshControl(){
		let { ui, category, userAction } = this.props;
		return (
			<RefreshControl { ...refreshControlConfig }
				refreshing={ ui.refreshPending }
				onRefresh={ ()=>{ userAction.getUserAssetByCategory(category) } } />
		);
	}

	renderContentList(){
		let { category } = this.props;
		if(category === postCategory.blink){
			return <UserBlinkList router={ router }/>;
		}
		if(category === postCategory.question){
			return <UserQuestionList router={ router }/>;
		}
		if(category === postCategory.favorite){
			return <UserFavoriteList router={ router }/>;
		}
		return <UserPostList router={ router }/>;
	}

	renderContent(){
		const { category, router } = this.props;

		if(this.state.hasFocus === false || ui.refreshPending !== false){
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (assets && assets.length) {
			return this.renderContentList();
		}
		return (
			<HintMessage />
		);
	}

	render() {
		let { router, user } = this.props;
		return (
			<View style={ ComponentStyles.container }>
				<UserRender
					user={ user }
					category={ this.state.category } 
					refreshControl={ this.renderListRefreshControl() }
					onListEndReached = { ()=>this.onListEndReached() } 
					router = { router }>

					{ this.renderContent() }

				</UserRender>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	
});

export default connect((state, props) => ({
	user: state.user,
  	assets: state.user[props.category],
	ui: state.userListUI[props.category]
}), dispatch => ({ 
	userAction: bindActionCreators(UserAction, dispatch)
}), null, {
  withRef: true
})(UserAssetPage);