import React, { Component } from 'react';
import {
	View,
	StatusBar
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { storageKey } from '../config';
import * as ConfigAction from '../action/config';

class Authorization extends Component {

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentWillReceiveProps(nextProps, nextStates) {
		
	}

	componentDidUpdate(){
		let { config, router } = this.props;
    	console.info(config);
	}

	componentDidMount(){
		this.userStatusHandle();
	}	

	userStatusHandle(){
    	this.props.configAction.getConfig(storageKey.USER_TOKEN);
	}

	render(){
		return null;
	}
}

export default connect(state => ({
  	config: state.config
}), dispatch => ({ 
	configAction : bindActionCreators(ConfigAction, dispatch)
}), null, {
  	withRef: true
})(Authorization);



