import React, { Component } from 'react';
import {
	View,
	AppState,
	NetInfo,
	StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Toast from './toast';
import * as Updater from '../common/updater';

class Plugin extends Component {

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentWillReceiveProps(nextProps, nextStates) {
		if (this.props.common.message.id !== nextProps.common.message.id) {
			let message = nextProps.common.message.text;
			if (message && typeof message === "string") {
				//this.refs.toast.show({message: message});
			}
		}
	}

	componentDidMount(){
		this.getNetStatus().done((status)=>{
			if (status) {
				this.updateHandle();
			}else{
				this.refs.toast.show({
					message : "请检查你的网络连接"
				});
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
					translucent ={ true }
					backgroundColor="rgba(0, 0, 0, 0.2)"
					barStyle="light-content" />
			    <Toast ref="toast"/>
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



