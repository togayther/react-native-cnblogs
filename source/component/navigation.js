import React, { Component } from 'react';
import {
	Navigator,
	Image,
	StatusBar,
	View,
	Dimensions
} from 'react-native';

import * as Page from '../view';
import Router from './router';
import Plugin from './plugin';
import Authorization from './authorization';
import { CommonStyles, StyleConfig } from '../style';

const defaultRoute = {
	name: 'auth',
	component: Page.Auth
};

class Navigation extends Component {

	constructor(props) {
		super(props);
	}
	
	renderScene(route, navigator) {
		this.router = this.router || new Router(navigator);
		let Component = route.component;
		if (Component) {
			let componentInstance =  <Component {...route.props} 
					ref={(view)=> { route.sceneRef = view } }
					navigator={ navigator }
					router={this.router} />
			return componentInstance;
		}
	}

	onDidFocus(route){
		if(route.sceneRef.getWrappedInstance){
			let wrappedComponent = route.sceneRef.getWrappedInstance();
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
		return Navigator.SceneConfigs.FloatFromRight
	}

	render() {
		return (
			<View style={ CommonStyles.container }>
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

export default Navigation;
