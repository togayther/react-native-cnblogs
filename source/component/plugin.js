import React, { Component } from 'react';
import {
	View,
	StatusBar,
	AppState,
	NetInfo,
	ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Updater from '../common/updater';

class Plugin extends Component {

	constructor(props) {
	    super(props);
	}

	componentWillReceiveProps(nextProps, nextStates) {
		if (this.props.common.message.id !== nextProps.common.message.id) {
			let message = nextProps.common.message.text;
			if (message) {
				ToastAndroid.show(message, ToastAndroid.LONG);
			}
		}
	}

	componentDidMount(){
		this.getNetStatus().done((status)=>{
			if (status) {
				this.updateHandle();
			}else{
				ToastAndroid.show("请检查你的网络连接", ToastAndroid.LONG);
			}
		})
	}	

	getNetStatus(){
		return NetInfo.fetch().then((netinfo=> {
			return netinfo.toUpperCase() != 'NONE';
		}));
	}

	updateHandle(){
		Updater.update();
		AppState.addEventListener("change", (appStatus) => {
			if (appStatus === "active") {
				Updater.update();
			}
		});
	}

	render(){
		return (
			<View>
				<StatusBar 
					barStyle={ 'light-content' }
					backgroundColor={'rgba(0,0,0,0.9)'}/>


			</View>
		);
	}
}

export default connect(state => ({
  common : state.common
}), dispatch => ({ 
}), null, {
  withRef: true
})(Plugin);



