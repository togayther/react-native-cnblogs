import React, { Component } from 'react';
import {
	StatusBar,
	AppState,
	NetInfo,
	View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast';
import * as Updater from '../common/updater';

class Plugin extends Component {

	constructor(props) {
	    super(props);
	}

	componentWillReceiveProps(nextProps, nextStates) {
		if (this.props.common.message.id !== nextProps.common.message.id) {
			let message = nextProps.common.message.text;
			if (message) {
				Toast.showLongBottom(message);	
			}
		}
	}

	componentDidMount(){
		this.getNetStatus().done((status)=>{
			if (status) {
				this.updateHandle();
			}else{
				Toast.showLongBottom("请检查你的网络连接");	
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



