import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	RefreshControl
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ViewPage from '../component/view';
import Toast from '@remobile/react-native-toast';
import HintMessage from '../component/hintMessage';
import UserRender from '../component/header/user';
import SingleButton from '../component/button/single';
import Spinner from '../component/spinner';
import UserBlinkList from '../component/listview/userBlinkList';
import UserQuestionList from '../component/listview/userQuestionList';
import UserPostList from '../component/listview/userPostList';
import UserFavoriteList from '../component/listview/userFavoriteList';
import { postCategory } from '../config';
import * as UserAction from '../action/user';
import * as PostAction from '../action/post';
import refreshControlConfig from '../config/refreshControl';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

class UserAssetPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false,
			pending: false,
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
				{ text: '好的', onPress: () => null }
			]
		)
	}

	onRemovePress(data){
		if(data){
			Alert.alert(
				'系统提示',
				'确定删除该记录？',
				[
					{text: '取消', onPress: () => null },
					{text: '确定', onPress: (e) => this.handleRemovePress(data) },
				]
			)
		}
	}

	getRemoveParams(post){
		const { category } = this.props;
		let params = {};
		if(category === postCategory.favorite){
			params.url = encodeURIComponent(post.LinkUrl);
		}else{
			params.id = post.Id;
		}
		return params;
	}

	handleRemovePress(post){
		const { postAction, category } = this.props;
		this.setState({ pending: true });
		const removeParams = this.getRemoveParams(post);
		postAction.removePost({
			category: category, 
			params: removeParams,
			resolved: (data)=>{
				this.onRemoveResolved(data);
			},
			rejected: (data)=>{
				this.onRemoveRejected(data);
			}
		});
	}

	onRemoveResolved(){
		this.setState({ pending: false });
		Toast.show("恭喜你，删除成功");
	}

	onRemoveRejected(){
		this.setState({ pending: false });
		Toast.show("删除失败，请稍候重试");
	}
	
	renderListRefreshControl(){
		const { ui, category, userAction } = this.props;
		return (
			<RefreshControl { ...refreshControlConfig }
				refreshing={ ui.refreshPending }
				onRefresh={ ()=>{ userAction.getUserAssetByCategory(category) } } />
		);
	}

	renderContentList(){
		const { category, router } = this.props;
		if(category === postCategory.blink){
			return <UserBlinkList 
					router={ router }
					onRemovePress = { (e)=>this.onRemovePress(e) }/>;
		}
		if(category === postCategory.question){
			return <UserQuestionList 
					router={ router }
					onRemovePress = { (e)=>this.onRemovePress(e) }/>;
		}
		if(category === postCategory.favorite){
			return <UserFavoriteList 
					router={ router }
					onRemovePress = { (e)=>this.onRemovePress(e) }/>;
		}
		return <UserPostList router={ router }/>;
	}

	renderContent(){
		const { category, router, ui, assets } = this.props;
		if(this.state.hasFocus === true){
			if(ui.refreshPending == false && (!assets || !assets.length)){
				return <HintMessage />;
			}
			if(assets && assets.length){
				return this.renderContentList();
			}
		}
	}

	renderAssetButton(){
		const { category, router } = this.props;

		if(category !== postCategory.favorite){
			let onPress = ()=>null;
			if(category === postCategory.blink){
				onPress = ()=>router.push(ViewPage.blinkAdd());
			}else if(category === postCategory.question){
				onPress = ()=>router.push(ViewPage.questionAdd());
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
	}

	renderPending(){
		if(this.state.pending === true){
		return (
			<Spinner style={ ComponentStyles.pending_container }/>
		)
		}
	}

	render() {
		const { router, user } = this.props;
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

				{ this.renderPending() }

				{ this.renderAssetButton() }
				
				<SingleButton 
					position="left" 
					onPress = { ()=>router.pop() }/>
			</View>
		)
	}
}

export default connect((state, props) => ({
	user: state.user,
  	assets: state.user[props.category],
	ui: state.userListUI[props.category]
}), dispatch => ({ 
	userAction: bindActionCreators(UserAction, dispatch),
	postAction: bindActionCreators(PostAction, dispatch)
}), null, {
  withRef: true
})(UserAssetPage);