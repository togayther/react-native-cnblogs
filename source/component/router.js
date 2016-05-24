import React, {
	Platform,
	BackAndroid
} from 'react-native';

import * as View from '../view';
import * as SceneConfig from '../config/sceneConfig';

class Router {
	constructor(navigator) {
		this.navigator = navigator;

		if (Platform.OS === 'android') {
			BackAndroid.addEventListener('hardwareBackPress', ()=> {
				const routesList = this.navigator.getCurrentRoutes();
				const currentRoute = routesList[routesList.length - 1];
				console.log(currentRoute);
				if (currentRoute.name !== 'main') {
					navigator.pop();
					return true;
				}
				return false;
			});
		}
	}

	pop() {
		this.navigator.pop();
	}

	push(route, props = {}) {
		route.props = props;
		route.sceneConfig = route.sceneConfig ? route.sceneConfig : CustomSceneConfigs.customFloatFromRight;
		route.component = route.component;
		this.navigator.push(route);
	}

	toAbout(props) {
		this.push({
			component: View.About,
			name: 'about',
			sceneConfig: SceneConfig.customFloatFromRight
		}, props);
	}

	toPost(props) {
		this.push({
			component: View.Post,
			name: 'post',
			sceneConfig: SceneConfig.customFloatFromRight
		}, props);
	}
}


export default Router;
