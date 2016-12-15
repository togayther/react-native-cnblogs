import React, { Component } from 'react';
import {
	View,
	NetInfo,
	Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from '../config';
import Toast from '@remobile/react-native-toast';
import * as UpdateAction from '../action/update';
import { openLink } from '../common';

class Updater extends Component {
	
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		this.getNetStatus().done((status)=>{
			if (status) {
				this.getUpdateInfo();
			}else{
				Toast.showLongBottom("请检查你的网络连接");
			}
		});
	}

	getUpdateInfo(){
		const { updateAction } = this.props;
		const currentVersion = Config.appInfo.version;
		updateAction.getUpdateInfo(currentVersion);
	}

	getNetStatus(){
		return NetInfo.fetch().then((netinfo=> {
			return netinfo.toUpperCase() != 'NONE';
		}));
	}

	formatUpdateContent(updateInfo){
		let updateContent = updateInfo.content;
		if(updateContent){
			return updateContent.split("|").join("\n");
		}
	}

	showUpdateInfo(updateInfo){
		const updateContent = this.formatUpdateContent(updateInfo);
		Alert.alert(
			updateInfo.title || '温馨提示',
			updateContent,
			[
				{
					text: '拒绝', 
					onPress: () => null 
				},
				{
					text: '支持', 
					onPress: () => this.handleUpdatePress(updateInfo) 
				}
			]
		)
	}

	handleUpdatePress(updateInfo){
		openLink(updateInfo.link);
	}

	render() {
		const { router, update } = this.props;

		if(router){
			const currentRoute = router.getCurrentRoute();
			if(currentRoute && currentRoute.name && currentRoute.name === "home"){
				if(update && update.content && update.link){
					this.showUpdateInfo(update);
				}
			}
		}

		return null;
	}
}

export default connect(state => ({
  	update: state.update
}), dispatch => ({ 
    updateAction : bindActionCreators(UpdateAction, dispatch)
}), null, {
  	withRef: true
})(Updater);



