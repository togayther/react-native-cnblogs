import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { NavbarStyles, SearchStyles, StyleConfig } from '../style';

import { getImageSource } from '../common';

class SearchBar extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	key:''
	    };

	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onSearchPress(){
		let { onSearchHandle } = this.props;
		let txtSearch = this.refs.txtSearch;
		if (this.state.key === '') {
			txtSearch.focus();
		}else{
			txtSearch.blur();
			onSearchHandle(this.state.key);
		}
	}

	renderBackground(){
		if (!this.backgroundImage) {
			this.backgroundImage = getImageSource();
		}
		return (
			<Image 
         		style={ NavbarStyles.backgroundImage } 
         		source={ {uri: this.backgroundImage} } />
		)
	}
	
	renderLeftContent(){
		let { placeholder = '请输入博主名称' } = this.props;
	    return (
	        <View style={ NavbarStyles.leftContent }>
	        	<TouchableOpacity 
		        	style = { NavbarStyles.iconContainer }
		        	onPress={ ()=>{ this.props.router.pop() } }>
			      <Icon
			        name={ "ios-arrow-round-back" }
			        color={ StyleConfig.foregroundColor } 
			        size= { 22 }
			        style = { NavbarStyles.icon } />
			    </TouchableOpacity>

			    <TextInput 
			    	ref="txtSearch"
			    	blurOnSubmit ={true}
			    	onSubmitEditing = { ()=> this.onSearchPress() }
			    	style={ SearchStyles.searchInput }
	    			placeholder ={ placeholder }
	    			placeholderTextColor  = { StyleConfig.foregroundColor }
	    			maxLength = { 20 }
	    			underlineColorAndroid = { 'transparent' }
				    onChangeText={(key) => this.setState({key})}
				    value={this.state.key} />
	        </View>
	    );
	}

	renderRightContent(){
		return (
			<View style={ NavbarStyles.rightContent }>
				<TouchableOpacity 
					style = { NavbarStyles.iconContainer }
					onPress={()=> this.onSearchPress() }>
	    			<Icon 
	    				name={ "ios-search-outline" }
	    				color={ StyleConfig.foregroundColor }  
	    				size= { 22 }
	    				style={ NavbarStyles.icon }/>
				</TouchableOpacity>
			</View>
		);
	}


	render() {
	    return (
	    	<View style={ NavbarStyles.container }>
				{ this.renderBackground() }
				{ this.renderLeftContent() }
				{ this.renderRightContent() }
          	</View>
	    )
	}
}

export default SearchBar;


