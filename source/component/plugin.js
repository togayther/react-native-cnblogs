import React, { Component } from 'react';
import {
	View,
	AppState,
	NetInfo,
	StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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
				Toast.show(message);
			}
		}
	}

	componentDidMount(){
		this.getNetStatus().done((status)=>{
			if (status) {
				this.updateHandle();
			}else{
				Toast.show("请检查你的网络连接");
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



