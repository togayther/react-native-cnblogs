import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Image,
	Alert,
	StyleSheet,
	RefreshControl,
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
import SingleButton from '../component/button/single';
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
		const { userAction, user, category } = this.props;
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

	onBlogAddPress(){
		Alert.alert(
		'系统提示',
		'抱歉，暂不支持博文信息的发布。',
		[
			{text: '好的', onPress: () => null }
		]
		)
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
		let { category, router } = this.props;
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
		const { category, router, ui, assets } = this.props;
		if(this.state.hasFocus === true){
			if(ui.refreshPending == false && !assets.length){
				return <HintMessage />;
			}
			if(assets && assets.length){
				return this.renderContentList();
			}
		}
	}

	renderAssetButton(){
		let { category, router } = this.props;
		let onPress = ()=>null,
			params = { successAction: 'replaceToUser'};
		if(category === postCategory.blink){
			onPress = ()=>router.toBlinkAdd(params);
		}else if(category === postCategory.question){
			onPress = ()=>router.toQuestionAdd(params);
		}else{
			onPress = ()=> this.onBlogAddPress();
		}
		return (
			<SingleButton 
				icon="ios-create-outline"
				position="right"
				color = { StyleConfig.action_color_danger }
				onPress={ onPress }/>
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

				{ this.renderAssetButton() }
				
				<SingleButton 
					position="left" 
					onPress = { ()=>router.pop() }/>
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