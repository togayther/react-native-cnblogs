import React, { Component } from 'react';
import {
	Text,
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBarStyles, CommonStyles, StyleConfig } from '../style';
import Backer from './backer';

const searchIcon = 'ios-search';
const searchIconSize = 22;

class SearchBar extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	key:''
	    };
	}

	renderSearchLeftConfig(){
	    let { router } = this.props;
	    return (
	        <Backer router = { router }/>
	    );
	}

	renderSearchRightConfig(){
		let { onSearchHandle } = this.props;
		return (
			<TouchableOpacity onPress={()=> onSearchHandle(this.state.key) }>
				<View>
	    			<Icon name={ searchIcon }
	    				size={ searchIconSize } 
	    				style={ [CommonStyles.navbarMenu, { color: StyleConfig.mainColor}] }/>
	    		</View>
			</TouchableOpacity>
		);
	}

	renderSearchInput(){

		let { placeholder = '请输入博主名称' } = this.props;

		return (
			<TextInput style={ SearchBarStyles.searchInput }
	    			placeholder ={ placeholder }
	    			maxLength = { 20 }
	    			underlineColorAndroid = { '#fff' }
				    onChangeText={(key) => this.setState({key})}
				    value={this.state.key} />
		);
	}

	render() {
	    return (
	    	<View style={ SearchBarStyles.container }>
	    		{ this.renderSearchLeftConfig() }
	    		{ this.renderSearchInput() }
	    		{ this.renderSearchRightConfig() }
	    	</View>
	    )
	}
}

export default SearchBar;


