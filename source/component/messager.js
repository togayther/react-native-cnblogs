import React, { Component } from 'react';
import {
	View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CommonStyles, StyleConfig } from '../style';
import Toast from '@remobile/react-native-toast';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Messager extends Component {
	
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentWillReceiveProps(nextProps, nextStates) {
		if (this.props.common.message.id !== nextProps.common.message.id) {
			const message = nextProps.common.message.text;
			if (message && typeof message === "string") {
				Toast.show(message);
			}
		}
	}

	render() {
        return null;
	}
}

export default connect(state => ({
  	common : state.common
}), dispatch => ({ 
}), null, {
  	withRef: true
})(Messager);




