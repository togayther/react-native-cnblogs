import React, { Component } from 'react';
import {
	Text,
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { SearchBarStyles } from '../style';

class SearchBar extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	searchKey : ''
	    };
	}

	renderSearchLeftConfig(){

	}

	renderSearchRightConfig(){

	}

	render() {
	    return (
	    	<View style={ styles.container }>
	    		<View>
	    			<Icon name='chevron-left' size={22}
				        style={ styles.searchIcon } />
	    		</View>
	    		<TextInput style={ styles.searchInput }
	    			placeholder ={ '作者名称' }
	    			maxLength = { 20 }
	    			underlineColorAndroid = { '#fff' }
				    onChangeText={(searchKey) => this.setState({searchKey})}
				    value={this.state.text} />
				<View>
	    			<Icon name='magnifying-glass' size={22}
				        style={ styles.searchIcon } />
	    		</View>
	    	</View>
	    )
	}
}

const styles = StyleSheet.create({
	container: {
	    flexDirection:'row',
	    paddingLeft: 10,
	    paddingRight: 10,
	    alignItems:'center',
	    backgroundColor: '#fff',
	    borderBottomWidth:1,
	    borderBottomColor:'#f5f5f5'
	},
	searchIcon:{
		color:'#09a097'
	},
	searchInput:{
		flex: 1,
		height: 43,
		fontSize: 16,
		marginLeft: 5,
		textAlign:'center',
		color:'rgba(0,0,0,0.7)',
		borderColor:'transparent',
		borderWidth: 0
	}
});


export default SearchBar;


