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
				if (currentRoute.name !== 'main') {
					this.navigator.pop();
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
		route.sceneConfig = route.sceneConfig ? route.sceneConfig : CustomSceneConfigs.customPushFromRight;
		route.component = route.component;
		this.navigator.push(route);
	}

	toPost(props) {
		this.push({
			component: View.Post,
			name: 'post',
			sceneConfig: SceneConfig.customPushFromRight
		}, props);
	}

	toNews(props) {
		this.push({
			component: View.News,
			name: 'news',
			sceneConfig: SceneConfig.customPushFromRight
		}, props);
	}

	toAuthor(props) {
		this.push({
			component: View.Author,
			name: 'author',
			sceneConfig: SceneConfig.customPushFromRight
		}, props);
	}

	toComment(props) {
		this.push({
			component: View.Comment,
			name: 'comment',
			sceneConfig: SceneConfig.customPushFromRight
		}, props);
	}

	toSearch(props) {
		this.push({
			component: View.Search,
			name: 'search',
			sceneConfig: SceneConfig.customPushFromRight
		}, props);
	}

	toFeedback(props) {
		this.push({
			component: View.FeedBack,
			name: 'feedback',
			sceneConfig: SceneConfig.customPushFromRight
		}, props);
	}

	toSetting(props) {
		this.push({
			component: View.Setting,
			name: 'setting',
			sceneConfig: SceneConfig.customPushFromRight
		}, props);
	}

	toAbout(props) {
		this.push({
			component: View.About,
			name: 'about',
			sceneConfig: SceneConfig.customPushFromRight
		}, props);
	}
}


export default Router;
