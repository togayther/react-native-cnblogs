import React, { Component } from 'react';
import {
	View,
	NetInfo,
	Navigator
} from 'react-native';
import { connect } from 'react-redux';
import Router from './router';
import Plugin from './plugin';
import ViewPage from './view';
import { ComponentStyles, StyleConfig } from '../style';

const defaultRoute = ViewPage.startup();

class Navigation extends Component {

	constructor(props) {
		super(props);
	}

	renderScene(route, navigator) {
		this.router = this.router || new Router(navigator);
		let Component = route.component;
		if (Component) {
			return <Component {...route.props} 
					navigator={ navigator }
					router={this.router} 
					ref={(view)=> { route.sceneRef = view } }/>
		}
	}

	onDidFocus(route){
		if(route.sceneRef.getWrappedInstance){
			const wrappedComponent = route.sceneRef.getWrappedInstance();
			if(wrappedComponent){
				wrappedComponent.componentDidFocus &&
				wrappedComponent.componentDidFocus();
			}
		}
		route.sceneRef.componentDidFocus &&  route.sceneRef.componentDidFocus();
	}

	configureScene(route) {
		if (route.sceneConfig) {
			return route.sceneConfig
		}
		return Navigator.SceneConfigs.PushFromRight
	}

	render() {
		return (
			<View style={ ComponentStyles.container }>
				<Plugin />
				<Navigator
					initialRoute={ defaultRoute }
					configureScene={ this.configureScene.bind(this) }
					renderScene={ this.renderScene.bind(this) } 
					onDidFocus={ this.onDidFocus.bind(this) }/>
			</View>
		)
	}
}

export default connect(state => ({
	user: state.user,
}), dispatch => ({ 
}), null, {
  	withRef: true
})(Navigation);
