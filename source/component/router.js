import React, {
	Platform,
	Navigator,
	BackAndroid,
	ToastAndroid
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import * as View from '../view';
import * as RouterSceneConfig from '../config/routerSceneConfig';

class Router {
	constructor(navigator) {
		this.navigator = navigator;
		this._onHomeBackPress = this.onHomeBackPress.bind(this);
		this._onExitApp = this.exitApp.bind(this);

		if (Platform.OS === 'android') {
			BackAndroid.addEventListener('hardwareBackPress', this._onHomeBackPress);
		}
	}

	onHomeBackPress(){
		let currentRoute = this.getCurrentRoute();
		if (currentRoute.name !== 'home') {
			this.navigator.pop();
			return true;
		}

		this.handleHomeBackPress();
		return true;
	}

	handleHomeBackPress(){
		if (Platform.OS === "android") {
			ToastAndroid.show("再按一次你就要离开我了", ToastAndroid.SHORT);
	      	BackAndroid.removeEventListener("hardwareBackPress", this._onHomeBackPress);
	      	BackAndroid.addEventListener("hardwareBackPress", this._onExitApp);
	      	this.timer = TimerMixin.setInterval(() => { 
				TimerMixin.clearInterval(this.timer);
	           	BackAndroid.removeEventListener("hardwareBackPress", this._onExitApp); 
	      　　  BackAndroid.addEventListener("hardwareBackPress", this._onHomeBackPress);
		    }, 2000);
		}
  　}

  	exitApp(){
  		BackAndroid.exitApp();
  	}

	getRouteList(){
		return this.navigator.getCurrentRoutes();
	}

	getCurrentRoute(){
		const routesList = this.getRouteList();
		return routesList[routesList.length - 1];
	}

	getPreviousRoute(){
		const routesList = this.getRouteList();
		return routesList[routesList.length - 2];
	}

	getNavigator(){
		return this.navigator;
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
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}

	toHome(props) {
		this.push({
			component: View.Home,
			name: 'home',
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}

	toAuthor(props) {
		this.push({
			component: View.Author,
			name: 'author',
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}

	toComment(props) {
		this.push({
			component: View.Comment,
			name: 'comment',
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}

	toSearch(props) {
		this.push({
			component: View.Search,
			name: 'search',
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}

	toSetting(props) {
		this.push({
			component: View.Setting,
			name: 'setting',
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}

	toAbout(props) {
		this.push({
			component: View.About,
			name: 'about',
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}

	toOffline(props) {
		this.push({
			component: View.Offline,
			name: 'offline',
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}

	toOfflinePost(props) {
		this.push({
			component: View.OfflinePost,
			name: 'offlinePost',
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}

	toTest(props) {
		this.push({
			component: View.Test,
			name: 'test',
			sceneConfig: RouterSceneConfig.customPushFromRight
		}, props);
	}
}


export default Router;
