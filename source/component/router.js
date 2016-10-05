import React, {
	Platform,
	Navigator,
	BackAndroid,
	ToastAndroid
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import * as View from '../view';
import * as RouterSceneConfig from '../config/routerScene';

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
		if (currentRoute.name !== 'home' && currentRoute.name!=='login' && currentRoute.name!='startup') {
			this.navigator.pop();
			return true;
		}

		this.handleHomeBackPress();
		return true;
	}

	handleHomeBackPress(){
		if (Platform.OS === "android") {
			ToastAndroid.show("再按一次退出应用", ToastAndroid.SHORT);
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

	setRoute(route, props = {}){
		route.props = props;
		route.sceneConfig = route.sceneConfig ? route.sceneConfig : RouterSceneConfig.customPushFromRight;
		route.component = route.component;
	}

	pop() {
		this.navigator.pop();
	}

	popN(n){
		this.navigator.popN(n);
	}

	push(route, props = {}) {
		this.setRoute(route, props);
		this.navigator.push(route);
	}

	replace(route, props = {}){
		this.setRoute(route, props);
		this.navigator.replace(route);
	}

	replacePrevious(route, props = {}){
		this.setRoute(route, props);
		this.navigator.replacePrevious(route);
	}

	replacePreviousAndPop(route, props = {}){
		this.setRoute(route, props);
		this.navigator.replacePreviousAndPop(route);
	}
	
	replaceAtIndex(route, index, props = {}){
		this.setRoute(route, props);
		this.navigator.replaceAtIndex(route, index)
	}	
}

export default Router;
