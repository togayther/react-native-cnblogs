import React,{
	Component,
	Navigator,
	StyleSheet,
	Image,
	Dimensions
} from 'react-native';
import Router from '../common/router';
import Config from '../config';
import * as View from '../view';
const { height, width } = Dimensions.get('window');

const defaultRoute = {
	name: 'main',
	component: View.Main
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
			<Image source={{ uri: Config.bodyimg }} style={styles.bodyimg}>
				<Navigator
					initialRoute={ defaultRoute }
					configureScene={ this.configureScene.bind(this) }
					renderScene={ this.renderScene.bind(this) } 
					onDidFocus={ this.onDidFocus.bind(this) }/>
			</Image>
		)
	}
}


const styles = StyleSheet.create({
	bodyimg: {
		flex: 1,
		height,
		width,
		backgroundColor: 'transparent'
	}
});

export default Navigation;
